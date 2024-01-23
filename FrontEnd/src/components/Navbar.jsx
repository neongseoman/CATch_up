import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Header>
      <Nav>
        <Link to={'/'}>홈</Link>
        <Link to={'user/login'}>로그인</Link>
      </Nav>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 72px;
  border-bottom: 1px solid var(--line-gray);
  background-color: #f7b84b;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Nav = styled.nav`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: right;
  gap: 36px;
  align-items: center;
  > span {
    font-weight: bold;
    cursor: pointer;
  }
  > a{
    background-color: #f7b84b;
  }
`;
export default Navbar;
