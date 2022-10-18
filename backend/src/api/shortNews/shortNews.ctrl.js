import mongoose from 'mongoose';
import ShortNews from '../../models/shortNews';

const { ObjectId } = mongoose.Types;

//뉴스 하나 가져오기
export const getNewsById = async (ctx, next) => {
  const {user} = ctx.state;
  const {id} = ctx.params;
  console.log("getNewsById의 id:", id);
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const news = await ShortNews.findById(id);
    console.log("getNews의 shortNews:", news);
    if (!news) {
      ctx.status = 404;
      return;
    }
    // console.log("user:", user);
    news.likeIds = news.likeIds[user._id]; //존재하지 않으면 undefined 또는 0 => false로 알려주면 될듯
    ctx.state.news = news;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

//요약 뉴스 한개만 가져오기
// Get http://localhost:4000/api/shortNews/632910256e7c1e4a66fba6cd
export const read = async ctx => {  
  console.log("read의 shortNews:",ctx.state);
  ctx.body = ctx.state.news;
};

//임시로 모든 뉴스 테이블에 있는 기사들 가져오기
// export const list = async ctx => {
//   const page = parseInt(ctx.query.page || '1', 10); //query는 문자열이기 때문에 숫자로 변환
//   if (page < 1) {
//     ctx.status = 400;
//     return;
//   }

//   try {
//     const shortNews = await ShortNews.find().sort({_id: -1}).limit(10).skip((page-1)*10).exec(); // exec()를 붙여 주어야 서버에 쿼리 요청
//     const shortNewsCount = await ShortNews.countDocuments().exec();
//     ctx.set('Last-Page', Math.ceil(shortNewsCount / 10));
//     ctx.body = shortNews.map((post) => post.toJSON()).map(post=>({
//       ...post,
//       body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
//     }));
//   } catch (e) {
//     ctx.throw(500, e);
//   }
// };

// 요약 뉴스 분야별로 불러오기 //가짜뉴스는 fi4eld가 fake
//Get http://localhost:4000/api/shortNews/?field=정치
export const list = async ctx => {
  console.log("요약뉴스 목록 불러오기");
  const page = parseInt(ctx.query.page || '1', 10);
  const shortNewsField = ctx.query.field; //?field = 101
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  console.log("<shortNews.ctrl.list> ctx.state:", ctx.state);
  var shortNews = [];
  var shortNewsCount = 0;
  try {
    // http://localhost:4000/api/shortNews 
    // 쿼리에 필드명이 없을때 메인페이지인 좋아요 많은 순으로 뉴스 정렬
    if(!shortNewsField) {
      console.log("<shortNews.list> 요약 뉴스 좋아요 순(전체)");
      shortNews = await ShortNews.find().sort({like: -1}).limit(12).skip((page-1)*12).exec();
      shortNewsCount = await ShortNews.countDocuments().exec();
    } else {
      shortNews = await ShortNews.find({field: shortNewsField}).sort({_id: -1}).limit(12).skip((page-1)*12).exec();
      shortNewsCount = await ShortNews.countDocuments({field: shortNewsField}).exec();
    }
    
    // 최근에 입력한 순서대록 목록 -> sort({_id: -1})
    // http://localhost:4000/api/shortNews/?field=정치
    // const shortNewsCount = await ShortNews.countDocuments({field: shortNewsField}).exec();
    console.log("shorNewsCount:", shortNewsCount);
    ctx.set('Last-Page', Math.ceil(shortNewsCount / 12));
    ctx.body = shortNews.map((post) => post.toJSON()).map(post=>({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }

};

// 좋아요 누를 때
export const setLike = async ctx => {
  const { user } = ctx.state;
  const { newsId } = ctx.params;
  let tmp = `likeIds.${user._id}`;
  let obj1 = { _id : newsId }; //게시물 아이디
  let obj2 = {};
  // obj1[tmp] = {$ne : true};  //like_users.user5 가 true가 아닐 경우(값이 false이거나 값이 없거나)
  // console.log("obj1 : ", obj1);
  obj2[tmp] = 1;
  // console.log("obj2:", obj2);

  // 호출하는 함수를 다르게?
  try {
    // news에 likeIds에 있는 값을 판단 getLike해서 값이 없으면 파라미터로 온 값저장하고 있으면 삭제
    ShortNews.findOneAndUpdate(obj1, { 
    // ShortNews.updateOne(obj1, {   
      $inc: { likeCount: 1} ,
      $set: obj2
    }, { returnOriginal: false, returnDocument: 'after'}, function(err, replaced) {  
      console.log("오류와 대체값");
      console.log(err, replaced);
      console.log("likeCount:", replaced.likeCount);
      ctx.state.news.likeCount = replaced.likeCount;
    }
    );
  } catch (e) {
    ctx.throw(500, 0);
  }
};

// export const setDislike = async ctx => {

// };

export const cancleLike = async ctx => {
  console.log("cancleLike 함수에 들어옴");
  const { user } = ctx.state;
  const { newsId } = ctx.params;
  let tmp = `likeIds.${user._id}`;
  let obj1 = { _id : newsId }; //게시물 아이디
  let obj2 = {};
  obj1[tmp] = {$ne : false};  //like_users.user5 가 false(0이나 값이 없음)가 아닐 경우(값이 true)
  console.log("obj1 : ", obj1);
  obj2[tmp] = 0;
  // console.log("obj2:", obj2);

  // 호출하는 함수를 다르게?
  try {
    // news에 likeIds에 있는 값을 판단 getLike해서 값이 없으면 파라미터로 온 값저장하고 있으면 삭제
    ShortNews.findOneAndUpdate(obj1, { 
    // ShortNews.updateOne(obj1, {   
      $inc: { likeCount: -1} ,
      $set: obj2
    }, { returnOriginal: false, returnDocument: 'after'}, function(err, replaced) {  
      console.log("오류와 대체값");
      console.log(err, replaced);
      console.log("새 likeCount:", replaced.likeCount);
      ctx.state.news.likeCount = replaced.likeCount;
    }
    );
    // console.log("a:", a);
    //return likeCount
  } catch (e) {
    ctx.throw(500, 0);
  }
};

//페이크뉴스 공개된 것만 불러오기