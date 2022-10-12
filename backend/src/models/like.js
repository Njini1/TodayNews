import mongoose from 'mongoose';

const { Schema } = mongoose;

const LikeSchema = new Schema({
  _id: mongoose.Types.ObjectId, //String, //기본키, 새롭게 내가 만들어야하나?, 요약 뉴스 id 외래키로 연결 
  field: String, //정치/경제/연예 등등, 가짜뉴스는 fake field?
  title: String,
  agency: String,
  body: String, //요약 기사로 저장
  regDate: Date, //나중에 마이페이지로 저장할때 언제 뉴스인지 알기위해서 
  likeCount: 0, //디폴트값 0 수정
  likeIds: {
    user1: false
  },
  url: String,  

})

const likes = mongoose.model("Like", LikeSchema);
export default likes;