import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ErrorPage from '../pages/ErrorPage';
import { useSetRecoilState } from 'recoil';
import { userInfoState, userInfoInitialState } from '../RecoilState/userRecoilState';


const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // 현재 위치를 가져옵니다.
  const logoutUserInfo = useSetRecoilState(userInfoState);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴 상태
  const [tagList, setTagList] = useState(['버스킹', '홍대', '라이브']);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigateHome = () => {
    navigate('/');
  };

  // 메인 페이지인지 확인합니다.
  const isMainPage = location.pathname === '/';
  // console.log("ismainpage:",isMainPage)
  useEffect(() => {
    // 로컬 스토리지에서 로그인 관련 데이터를 조회합니다.
    const loggedInUser = localStorage.getItem('user');

    // 사용자 정보가 로컬 스토리지에 있다면 로그인 상태로 간주합니다.
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserInfo(loggedInUser);
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
      },
    })
      .then(response => {
        if (response.ok) {
          // 로그아웃 성공 후 처리, 예: 로그인 상태 변경, 페이지 리다이렉션 등
          console.log('Logout successful');
          logoutUserInfo(userInfoInitialState);// 로그아웃 후 사용자 정보를 atom에서 제거
          alert("로그아웃되었습니다!!!")
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
        <HamburgerIcon onClick={toggleMenu}>☰</HamburgerIcon>
        {isMenuOpen && (

          <div>
            {isLoggedIn ? (
              <>
                <StyledLink to={'/user/myprofilepage'}>내 프로필({userInfo})</StyledLink>
                <StyledLink as="span" onClick={handleLogout}>로그아웃</StyledLink>
                <StyledLink to={'/streaming/info'}>방송하기</StyledLink>
              </>
            ) : (
              <StyledLink to={'/user/login'}>로그인</StyledLink>
            )}

          </div>

        )}
      </Nav>


      <StyledLogo
        src="/img/logo.png"
        alt="logo"
        isMainPage={isMainPage}
        onClick={navigateHome}
      />


      <SearchBar onSearch={handleSearch} />
      {isMainPage && (

        <TagField>
        {tagList.map((tag, i) => (
            <div key={i}>
                <Tag>#{tag}</Tag>
            </div>
        ))}
        {/* <Spacer /> */}
        </TagField>
      )}


    </Header>
  );

};

const StyledLogo = styled.img`
  user-select: none;
  width: ${props => props.isMainPage ? '320px' : '75px'};
  height: ${props => props.isMainPage ? '320px' : '75px'};
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 15px;
  height: ${props => props.isMainPage ? '350px' : '50px'};

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
const Spacer = styled.div`
  flex-grow: 1;
`;

const Nav = styled.nav`
  width: ${props => props.isMainPage ? '30%' : '100%'};
  display: flex;
  justify-content: ${props => props.isMainPage ? 'flex-end' : 'flex-start'};
  gap: 6px;
  align-items: center;

  > span {
    font-weight: bold;
    cursor: pointer;
  }

  > a {
    background-color: var(--main);
  }

  > a:last-child {
    margin-left: auto; // 마지막 요소만 오른쪽으로 정렬
  }

  // 모바일 화면에 대한 스타일
  @media (max-width: 768px) {
    gap: 15px;
    width: 100%; // 너비를 100%로 설정
    flex-direction: column; // 모바일 화면에서는 세로 방향으로 정렬
    justify-content: flex-start; // 모바일 화면에서는 시작 지점에서 정렬
  }
`;

const StyledLink = styled(Link)`
  user-select: none;
  color: var(--pure-white);
  min-width: 60px;
  font-weight: bold;
  text-decoration: none; /* 링크의 밑줄 제거 */
  display: inline-block; /* 배경과 패딩 적용을 위해 필요 */
  padding: 5px 10px; /* 링크 내부에 약간의 공간을 추가 */
  border-radius: 15px; /* 기본 테두리 반경 설정 */
  transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 */
  background-color: var(--main);

  &:hover {
    background-color: #f8a45b; /* 마우스 오버 시 배경색 */
    color: #7e3900; /* 마우스 오버 시 텍스트 색상 */
    border-radius: 15px; /* 마우스 오버 시 테두리 반경 */
  }

  // 모바일 화면에 대한 스타일
  @media (max-width: 768px) {
    width: 50px;
    font-size: 14px;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  user-select: none; // 사용자가 텍스트를 선택할 수 없도록 설정
  color: var(--pure-white);
  font-weight: bold;
  text-decoration: none; /* 링크의 밑줄 제거 */
  display: inline-block; /* 배경과 패딩 적용을 위해 필요 */
  padding: 5px 10px; /* 링크 내부에 약간의 공간을 추가 */
  border-radius: 15px; /* 기본 테두리 반경 설정 */
  transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 */

  &:hover {
    background-color: #f8a45b; /* 마우스 오버 시 배경색 */
    color: #7e3900; /* 마우스 오버 시 텍스트 색상 */
    border-radius: 15px; /* 마우스 오버 시 테두리 반경 */
  }

  @media (max-width: 768px) {
    display: block; // 모바일 화면에서만 햄버거 아이콘 표시
  }
`;
const TagField = styled.div`
    display: flex;
    justify-content: left;
    gap:5px;
    padding-top: 15px;
`;

const Tag = styled.div`
    font-size: 13px;
    user-select: none; 
    background: #56350A;
    color: #F7B84B;
    border-radius: 50px;
    margin:2px;
    padding: 8px;
    cursor: pointer;
`;
export default Navbar;
