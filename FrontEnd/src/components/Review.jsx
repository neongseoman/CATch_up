import React from 'react';
import styled from 'styled-components';

const Review = ({ author, date, content, initialRating,onDelete,showDeleteButton  }) => {
  return (
    <ReviewContainer>
      <ReviewHeader>
        <RatingAndCount>
          <Rating>
            {[...Array(5)].map((_, index) => (
              <Star key={index} filled={index < initialRating}>
                ★
              </Star>
            ))}
          </Rating>
          <RatingCount>{initialRating}/5</RatingCount>
        </RatingAndCount>
        <AuthorAndDate>
          <Author>{author}</Author>
          <Date>{date.split('T')[0]}</Date>
          <Date>{parseInt(date.slice(11, 13), 10) % 12 || 12}시 {date.slice(14, 16)}분에 작성됨</Date>
        </AuthorAndDate>
      </ReviewHeader>
      <Content>{content}</Content>
      {showDeleteButton && <button onClick={onDelete}>삭제</button>}
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
  border-radius: 15px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RatingAndCount = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  font-size: 24px;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
`;

const RatingCount = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const AuthorAndDate = styled.div`
  text-align: right;
`;

const Author = styled.p`
  font-weight: bold;
  margin: 0;
`;

const Date = styled.p`
  color: #666;
  margin: 0;
`;

const Content = styled.p``;

export default Review;
