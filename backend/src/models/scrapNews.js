import mongoose, { Schema } from 'mongoose';

const ScrapNewsSchema = new Schema({
  // _id: mongoose.Types.ObjectId,
  // field: String, //추가된 필드 //url에 ?field=  //이건 저장한 뉴스에서 스크랩 버튼을 클릭하면 저장한 뉴스의 field값 그대로 가져오면 될듯? (마이페이지에 분야별 폴더)
  agency: String, //추가된 필드22 // 파라미터로 넘김.. 너쪽에서 고민필요
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: { //이거 regDate로 바꾸고 싶다 상관은 없다만..
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId, 
    username: String,
  },
});

const ScrapNews = mongoose.model('ScrapNews', ScrapNewsSchema); //''안에 있는게 데이터베이스에 들어갈 테이블 이름
export default ScrapNews;

// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const ScrapNewsSchema = new Schema({
//   // _id: mongoose.Types.ObjectId,
//   title: String,
//   body: String,
//   tags: [String],
//   product: String,
//   location: String,
//   regDate: {
//     type: Date,
//     default: Date.now,
//   },
//   writer: {
//     _id: mongoose.Types.ObjectId,
//     username: String,
//   },
// });

// const ScrapNews = mongoose.model('Post', ScrapNewsSchema);
// export default ScrapNews;