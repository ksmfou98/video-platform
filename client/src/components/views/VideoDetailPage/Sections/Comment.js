import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

const Comment = ({ postId, commentLists, refreshFunction }) => {
  const user = useSelector((state) => state.user);

  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let variables = {
      content: commentValue,
      writer: user.userData._id,
      postId,
    };
    console.log(postId);

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
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}
      {commentLists &&
        commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                comment={comment}
                postId={postId}
                writer={user.userData._id}
                responseTo={comment._id}
                refreshFunction={refreshFunction}
                key={index}
              />
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button onClick={onSubmit} style={{ width: "20%", height: "52px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
