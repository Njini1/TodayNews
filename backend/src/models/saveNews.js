import mongoose from 'mongoose';

const { Schema } = mongoose;

const SaveNewsSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  // field: String,
  newsId: {
    type: mongoose.Types.ObjectId,
    ref: "ShortNews"
  }
});

const SaveNews = mongoose.model('SaveNews', SaveNewsSchema);
export default SaveNews; 
// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const SaveNewsSchema = new Schema({
//   _id: mongoose.Types.ObjectId,
//   newsId: {type: },// 뉴스 id와 외래키
//   userId: {type: }, //뉴스를 저장한 유저 아이디
// });

// const saveNews = mongoose.model('saveNews', SaveNewsSchema);
// export default saveNews; 

//이거는 요약뉴스의 데이터값(한 행 그자체로 저장하거나, 아이디만 저장하거나, 조인 비스무리를 알아보던가)

