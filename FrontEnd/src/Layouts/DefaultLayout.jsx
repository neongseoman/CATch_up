import styled from "@emotion/styled";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export const NavLayout = () => {
  return (
    <>
      <Navbar />
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  );
};
export const Layout = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const DefaultLayout = styled.div`
  width: 100%;
  min-height: 90vh;
  margin: 0 auto;
  max-width: 720px;
  padding: 36px;
  border-radius: 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export default DefaultLayout;
