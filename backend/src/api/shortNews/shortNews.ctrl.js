import mongoose from 'mongoose';
import ShortNews from '../../models/shortNews';
// import SummaryNews from '../../models/summaryNews';

const { ObjectId } = mongoose.Types;

//뉴스 하나 가져오기
export const getNewsById = async (ctx, next) => {
  const {id} = ctx.params;
  console.log("getNewsById의 id:", id);
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const news = await ShortNews.findById(id);
    console.log("news:", news);
    if (!news) {
      ctx.status = 404;
      return;
    }
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
  console.log(ctx.state);
  console.log("찍히나?");
  console.log(ctx.state);
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

// 요약 뉴스 분야별로 불러오기 //가짜뉴스는 field가 fake
//Get http://localhost:4000/api/shortNews/?field=정치
export const list = async ctx => {
  const page = parseInt(ctx.query.page || '1', 10);
  const shortNewsField = ctx.query.field; //?field = 101
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  console.log("ctx.state:", ctx.state);
  var shortNews = [];
  try {
    // http://localhost:4000/api/shortNews 
    // 쿼리에 필드명이 없을때 메인페이지인 좋아요 많은 순으로 뉴스 정렬
    if(!shortNewsField) {
      console.log("필드가 null이고 좋아요 순으로 표시");
      shortNews = await ShortNews.find().sort({like: -1}).limit(10).skip((page-1)*10).exec();
    }
    else {
      shortNews = await ShortNews.find({field: shortNewsField}).sort({_id: -1}).limit(10).skip((page-1)*10).exec();
    }
    
    // 최근에 입력한 순서대록 목록 -> sort({_id: -1})
    // http://localhost:4000/api/shortNews/?field=정치
    const shortNewsCount = await ShortNews.countDocuments({field: shortNewsField}).exec();
    ctx.set('Last-Page', Math.ceil(shortNewsCount / 10));
    ctx.body = shortNews.map((post) => post.toJSON()).map(post=>({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }

};

//페이크뉴스 공개된 것만 불러오기

//마음에 드는 뉴스 mypage에 저장
// export const saveNews = async ctx => {

// };  