// import mongoose from 'mongoose';
import SaveNews from '../../models/saveNews'

// const { ObjectId } = mongoose.Types;

//마음에 드는 뉴스 mypage에 저장
export const saveNews = async ctx => {
  //userid와 newsid를 받아와야함 그걸 saveNews에 저장
  const userId = ctx.state.user._id;
  const newsId = ctx.params.id;
  const field = ctx.query.field;
  
  const news = new SaveNews({
    userId,
    field,
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
