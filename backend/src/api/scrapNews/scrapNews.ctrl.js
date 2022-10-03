import mongoose from 'mongoose';
import Joi from '../../../node_modules/joi/lib/index';
import ScrapNews from '../../models/scrapNews';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'span',
    'b',
    'i',
  ],
  allowedAttributes: {
    li: ['class', 'style'],
    p: ['class'],
    span: ['style'],
    b: ['style'],
    u: ['style'],
    i: ['style'],
    s: ['style'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  console.log(id);
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await ScrapNews.findById(id);
    console.log('post:', post);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

// Post http://localhost:4000/api/scrapNews/?field=정치
// 스크랩할 요약 기사의 데이터를 가져와야함. agency?
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });

  // 클라이언트가 값을 빼먹을 때 400오류
  const result = schema.validate(ctx.request.body); //문법 바뀜
  console.log(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const field = ctx.query.field;
  const { title, body, tags, agency } = ctx.request.body;
  console.log('scrapbody의 값:', body);
  const post = new ScrapNews({
    field,
    agency,
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save(); // save 함수를 실행시켜야 데이터베이스에 저장 // await로 저장 요청을 완료할 때까지 대기 // await를 사용할때는try catch문으로 오류 처리해야함
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// html 을 없애고 내용이 너무 길으면 200자로 제한시키는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// Get http://localhost:4000/api/scrapNews
export const list = async (ctx) => {
  const user = ctx.state.user;
  const page = parseInt(ctx.query.page || '1', 10); //query는 문자열이기 때문에 숫자로 변환
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    // const posts = await ScrapNews.find().sort({_id: -1}).limit(10).skip((page-1)*10).exec(); // exec()를 붙여 주어야 서버에 쿼리 요청
    const posts = await ScrapNews.find({ 'user._id': user._id })
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec(); // exec()를 붙여 주어야 서버에 쿼리 요청
    // user가 작성한 스크랩 뉴스가 없는 거 예외처리
    // if(!posts) {
    //   console.log("사용자가 작성한 스크랩 뉴스가 없음");
    // }

    console.log('posts test:', posts);
    const postCount = await ScrapNews.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
        //body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

//스크랩한 뉴스 한개만 가져오기
// Get http://localhost:4000/api/scrapNews/632910256e7c1e4a66fba6cd
export const read = async (ctx) => {
  console.log(ctx.state);
  ctx.body = ctx.state.post;
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await ScrapNews.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

//Patch http://localhost:4000/api/scrapNews/632910256e7c1e4a66fba6cd
export const update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body); //문법 바뀜
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    // const post = await ScrapNews.findByIdAndUpdate(id, ctx.request.body, {
    const post = await ScrapNews.findByIdAndUpdate(id, nextData, {
      new: true, //true이면 업데이트 된 데이터 반환 false 업데이트 되긴 전 데이터 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  console.log(ctx.state);
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};
