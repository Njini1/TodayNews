// import mongoose from 'mongoose';
import SaveNews from '../../models/saveNews'

// const { ObjectId } = mongoose.Types;

//마음에 드는 뉴스 mypage에 저장
export const saveNews = async ctx => {
  //userid와 newsid를 받아와야함 그걸 saveNews에 저장
  const userId = ctx.state.user._id;
  const newsId = ctx.params.id;
  // const field = ctx.query.field;
  
  const news = new SaveNews({
    userId,
    // field,
    newsId
  });
  try {
    await news.save();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// export const getSaveNews = async ( ctx ) => {
//   const user = ctx.state.user;
// };

export const list = async (ctx) => {
  const user = ctx.state.user;
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const news = await SaveNews.find({
      userId: user._id
    }).populate('newsId').sort({ _id: -1 }).limit(12).skip((page - 1) * 12).exec();
    // if (news.length == 0) {
    //   console.log("사용자가 작성한 스크랩 뉴스 없음");
    //   // ctx.status = 400;
    //   return;
    // }
    const newsCount = await SaveNews.countDocuments({userId: user._id}).exec();
    ctx.set('Last-Page', Math.ceil(newsCount / 12));
    ctx.body = news
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body: post.body,
        // body: removeHtmlAndShorten(post.body),
        // body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e)
  }
}
