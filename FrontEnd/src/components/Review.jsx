import React from 'react';
import styled from 'styled-components';

const Review = ({ author, date, content, initialRating }) => {
  return (
    <ReviewContainer>
      <ReviewHeader>
        <Rating>
          {[...Array(5)].map((_, index) => (
            <Star key={index} filled={index < initialRating}>
              ★
            </Star>
          ))}
        </Rating>
        <AuthorAndDate>
          <Author>{author}</Author>
          <Date>{date}</Date>
        </AuthorAndDate>
      </ReviewHeader>
      <Content>{content}</Content>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 15px 0;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Rating = styled.div``;

const Star = styled.span`
  cursor: pointer;
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
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
