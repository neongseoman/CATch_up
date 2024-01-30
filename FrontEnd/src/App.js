import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUpForm from './pages/SignUpForm'; // 회원가입 폼 import
import Page from './pages/Page';
import UserInfo from './pages/UserInfo';
import {  NavLayout } from './Layouts/DefaultLayout';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<Main />} />
          <Route path='/page/:pageId' element={<Page />} />
        </Route>
        <Route path="user" element={<NavLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Login />} />
          <Route path='signup' element={<SignUpForm />} />
          <Route path='info' element={<UserInfo />} />
        </Route>
        <Route path="/error" render={(props) => <ErrorPage {...props} />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
