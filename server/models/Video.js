const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId, // id 값이 들어오면
    ref: "User", // User 모델에서 그 id에 해당하는 값을 다 가져옴
  },
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
  },
  privacy: {
    type: String,
  },
  filePath: {
    type: String,
  },
  category: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
}, { timestamps: true}); // 만든날이 표시가 되게끔 하는 명령어

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
