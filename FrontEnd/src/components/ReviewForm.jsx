import React, { useState } from 'react';
import styled from 'styled-components';

const ReviewForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ content, rating });
    setContent('');
    setRating(0);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Rating>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            onClick={() => setRating(index + 1)}
            filled={index < rating}
          >
            ★
          </Star>
        ))}
        <RatingCount>{rating}/5</RatingCount>
      </Rating>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 작성해 주세요"
      />
      <SubmitButton type="submit">등록</SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
`;

const RatingCount = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ReviewForm;