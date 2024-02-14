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

export const NavLayoutWithoutDefault = () =>{
  return (
    <>
      <Navbar />
        <Outlet />
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

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <DefaultMain>
        <Outlet />
      </DefaultMain>
    </>
  );
};

const DefaultMain = styled.div`
  width: 80%;
  min-height: 90vh;
  margin: 0 auto;
  padding: 36px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DefaultLayout = styled.div`
  width: 100%;
  min-height: 90vh;
  margin: 0 auto;
  max-width: 720px;
  padding: 36px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default DefaultLayout;
