const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false.err });
    // writer의 정보를 알고싶으면 populate를 쓰면 되지만 .save 에서는 populate를 못쓰기 때문에 find를 추가로 해줌
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
