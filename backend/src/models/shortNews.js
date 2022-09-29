import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShortNewsSchema = new Schema({ //이미지 저장 필드명? 필요
  _id: mongoose.Types.ObjectId, //String, //기본키, 새롭게 내가 만들어야하나?, 요약 뉴스 id 외래키로 연결 
  field: String, //정치/경제/연예 등등, 가짜뉴스는 fake field?
  title: String,
  agency: String,
  body: String, //요약 기사로 저장
  regDate: Date, //나중에 마이페이지로 저장할때 언제 뉴스인지 알기위해서 
  like: Number, //디폴트값 0 수정
  // like_ids: [{}], //좋아요 누른 사람 아이디
  link: String,                                                                            
});

const ShortNews = mongoose.model('ShortNews', ShortNewsSchema);
export default ShortNews;

// {
//   "_id": {
//     "$oid": "632876f162eb856e15255083"
//   },
//   "field": "정치",
//   "title": "test1",
//   "agency": "korea",
//   "body": "<p>test</p>",
//   "regDate": {
//     "$date": {
//       "$numberLong": "1663596273529"
//     }
//   },
//   "like": 3,
//   "link": "link입니다",
//   "__v": 0
// }




// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const SummaryNewsSchema = new Schema({
//   _id: String,
//   body: String,
//   like: Number,
//   regDate: Date,
// });

// const SummaryNews = mongoose.model('SummaryNews', SummaryNewsSchema);
// export default SummaryNews;