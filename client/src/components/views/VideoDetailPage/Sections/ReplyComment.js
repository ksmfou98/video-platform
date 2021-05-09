import React from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  commentLists,
  postId,
  writer,
  responseTo,
  refreshFunction,
  parentCommentId,
}) => {
  const renderReplyComment = (parentCommentId) => {
    commentLists.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div>
            <SingleComment
              comment={comment}
              postId={postId}
              writer={writer}
              responseTo={comment._id}
              refreshFunction={refreshFunction}
              key={index}
            />

            <ReplyComment
              comment={comment}
              postId={postId}
              writer={writer}
              responseTo={responseTo}
              refreshFunction={refreshFunction}
              commentLists={commentLists}
            />
          </div>
        )}
      </>
    ));
  };
  return (
    <div>
      <p style={{ fontSize: "14px", margin: 0, color: "gray" }} >
        View 1 more comment(s)
      </p>
      {renderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;
