import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "../components/Button";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const pageNum = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 사용자 정보를 가져오는 HTTP 요청
        const response = await fetch('${process.env.REACT_APP_API_BASE_URL}/api/dashboard', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다');
        }

        const data = await response.json();
        console.log(data)
        setUserInfo(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e)
        navigate('/user/login');
      }

    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>User Information</h1>
          <p><strong>Login ID:</strong> {userInfo.loginId}</p>
          <p><strong>Roles:</strong> {userInfo.loginRoles[0].authority}</p>

          <div>
            <p><strong>additionalInfo:</strong></p>
            <ul>
              {Object.entries(userInfo.additionalInfo).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          </div>

          <ListWrapper>
            {pageNum.map((e, i) => {
              return (
                <Link to={`/page/${e}`} key={i}>
                  <Button>페이지 {e}로 바로가기</Button>
                </Link>
              );
            })}
          </ListWrapper>
        </div>

      )}
    </div>
  );
}

const ListWrapper = styled.ul`
  display: flex;
  gap: 8px;
`;


export default UserInfo;
