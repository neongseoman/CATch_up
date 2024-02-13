import React, { useEffect, useState } from 'react';
import Review from './Review';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../RecoilState/userRecoilState';

const ReviewList = ({ streamNo, currentUserNo }) => {
  const [comments, setComments] = useState([]);
  const [recoil] = useRecoilState(userInfoState);

  useEffect(() => {
    // 댓글 목록을 가져오는 함수
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stream-comments/${streamNo}`);
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 가져오는 데 실패했습니다.", error);
      }
      console.log(recoil, " asdf ", recoil.idNo)
    };

    fetchComments();
  }, [streamNo]);

  const handleDelete = async (commentNo) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/stream-comments/${streamNo}`, {
        params: { userNo: recoil.idNo },
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
      alert("이미 작성하신 리뷰가 있습니다!")
      console.error("댓글 작성/수정 실패", error);
    }
  };

  return (
    <div>
      <ReviewForm onSubmit={handleCreateOrUpdate} />
      {comments.map(comment => (
        <Review
          key={comment.commentNo}
          author={comment.nickname}
          date={comment.createdTime}
          content={comment.comments}
          initialRating={comment.likes}
          onDelete={() => handleDelete(comment.commentNo)}
          showDeleteButton={recoil.idNo === comment.userNo}
        />
      ))}
    </div>
  );
};

export default ReviewList;
