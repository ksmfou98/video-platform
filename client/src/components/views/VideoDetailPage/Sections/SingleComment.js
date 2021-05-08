import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";

const { TextArea } = Input;

const SingleComment = ({
  videoId,
  writer,
  comment,
  responseTo,
  refreshFunction,
}) => {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let variables = {
      content: CommentValue,
      writer,
      postId: videoId,
      responseTo,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("코맨트를 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image}  />}
        content={comment.content}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <button onClick={onSubmit} style={{ width: "20%", height: "52px" }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
export default SingleComment;
