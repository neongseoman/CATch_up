import React, { useEffect, useState } from 'react';
import Review from './Review';
import ReviewForm from './ReviewForm';
import axios from 'axios';

const ReviewList = ({ streamNo, currentUserNo }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 댓글 목록을 가져오는 함수
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stream-comments/${streamNo}`);
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchComments();
  }, [streamNo]);

  const handleDelete = async (commentNo) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/stream-comments/${streamNo}`, {
        params: { userNo: 22 },
        withCredentials: true
      });
      setComments(comments.filter(comment => comment.commentNo !== commentNo));
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  const handleCreateOrUpdate = async (comment) => {
    const commentWithStreamNo = { ...comment, streamNo};
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stream-comments`,
      commentWithStreamNo,
      {
        withCredentials: true
      });
      setComments([...comments, response.data]);
    } catch (error) {
      alert("이미 작성하신 리뷰가 있습니다!!!")
      console.error("댓글 작성/수정 실패", error);
    }
  };

  return (
    <div>
      <ReviewForm onSubmit={handleCreateOrUpdate} />
      {comments.map(comment => (
        <Review
          key={comment.commentNo}
          author={comment.userNo}
          date={comment.createdTime}
          content={comment.comments}
          initialRating={comment.likes}
          onDelete={() => handleDelete(comment.commentNo)}
          showDeleteButton={22 === comment.userNo}
        />
      ))}
    </div>
  );
};

export default ReviewList;
