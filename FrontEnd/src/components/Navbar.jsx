import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ErrorPage from '../pages/ErrorPage';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../RecoilState/userRecoilState';

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // 현재 위치를 가져옵니다.

  // 메인 페이지인지 확인합니다.
  const isMainPage = location.pathname === '/';
  console.log("ismainpage:",isMainPage)
  useEffect(() => {
    // 로컬 스토리지에서 로그인 관련 데이터를 조회합니다.
    const loggedInUser = localStorage.getItem('user');

    // 사용자 정보가 로컬 스토리지에 있다면 로그인 상태로 간주합니다.
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(loggedInUser));
    }
  }, [location.pathname]);

  const handleSearch = (searchTerm) => {
    console.log(`검색어: ${searchTerm}`);
    // 검색 로직 구현
  };

  const handleLogout = () => {
    // 로컬 스토리지에서 사용자 정보를 제거합니다.
    localStorage.removeItem('user');

    // 로그인 상태를 업데이트합니다.
    setIsLoggedIn(false);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 필요하다면 여기에 추가 헤더를 포함시킬 수 있습니다
      },
      // 필요하다면 credentials: 'include'를 추가하여 쿠키를 포함시킬 수 있습니다
    })
      .then(response => {
        if (response.ok) {
          // 로그아웃 성공 후 처리, 예: 로그인 상태 변경, 페이지 리다이렉션 등
          console.log('Logout successful');
          alert("로그아웃되었습니다!!!")

          const fetchedUserInfo = { isLoggedIn: false, userId: null};
          setUserInfo(fetchedUserInfo); // 로그인 후 사용자 정보를 atom에 저장

          navigate('/');
        } else {
          // 서버 에러 처리
          console.error('Logout failed', response);
        }
      })
      .catch(error => {
        // 네트워크 에러 처리
        console.error('Network error', error);
        return <ErrorPage error={error} />;
      });
      
  };

  return (
    <Header isMainPage={isMainPage}>
      <Nav>
        <StyledLink to={'/'}>홈</StyledLink>
        {isLoggedIn ? (
          <>
            <StyledLink to={'/user/info'}>내정보({userInfo})</StyledLink>
            <StyledLink as="span" onClick={handleLogout}>로그아웃</StyledLink>
          </>
        ) : (
          <StyledLink to={'/user/login'}>로그인</StyledLink>
        )}
      </Nav>
      <img
        src="/img/logo.png"
        alt="logo"
        style={{
          width: isMainPage ? '200px' : '80px',
          height: isMainPage ? '200px' : '80px',
        }}
      />
      <SearchBar onSearch={handleSearch} />


    </Header>
  );

};

const Header = styled.header`
  width: 100%;
  padding: 15px;
  height: ${props => props.isMainPage ? '320px' : '50px'};

  background-color: var(--main);
  display: flex; /* 플렉스 컨테이너로 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  ${props => props.isMainPage ? 'flex-direction: column; ' : ''}
  // 모바일 화면에 대한 스타일
  @media (max-width: 768px) {
    flex-direction: column; // 세로 방향으로 쌓기
    height: auto; // 높이 자동 조절
  }
`;

const Nav = styled.nav`
  width: ${props => props.isMainPage ? '30%' : '100%'};

  display: flex;
  justify-content: ${props => props.isMainPage ? 'right' : 'left%'};
  gap: 36px;
  align-items: center;
  > span {
    font-weight: bold;
    cursor: pointer;
  }
  > a{
    background-color: var(--main);
  }

  // 모바일 화면에 대한 스타일
  @media (max-width: 768px) {
    gap: 15px;
    width: 100%; // 너비를 100%로 설정
    justify-content: center; // 중앙 정렬
  }
`;

const StyledLink = styled(Link)`
  color: var( --pure-white);
  font-weight: bold;

  // 모바일 화면에 대한 스타일
  @media (max-width: 768px) {
    width:50px;
    font-size:14px;
  }
`;

export default Navbar;
