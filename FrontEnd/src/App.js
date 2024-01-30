import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUpForm from './pages/SignUpForm'; // 회원가입 폼 import
import Page from './pages/Page';

import UserInfo from './pages/UserInfo';
import {  NavLayout,NavLayoutWithoutDefault } from './Layouts/DefaultLayout';
import ErrorPage from './pages/ErrorPage';
import MainMapPage from './pages/MainMapPage'

import ChatApp from './components/ChatApp'
import Streaming from './pages/Streaming'
import React, { useEffect } from 'react';
import StreamingPage from "./pages/StreamingPage";
import {Button} from "./components/Button";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import Audience from "./pages/Watching";
import Watching from "./pages/Watching";


import SearchResult from './Search/SearchResult';



function App() {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<Main />} />
          <Route path='/page/:pageId' element={<Page />} />
          <Route path='/streaming' element={<Streaming />} />
          <Route path='/watching' element={<Watching />} />
        </Route>
        <Route element={<NavLayoutWithoutDefault />}>
          <Route path='/map' element={<MainMapPage />} />
        </Route>
        <Route path="user" element={<NavLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Login />} />
          <Route path='signup' element={<SignUpForm />} />
          <Route path='info' element={<UserInfo />} />
        </Route>
        <Route path="streamingpage" element={<StreamingPage />}>
        </Route>
        <Route path="/error" render={(props) => <ErrorPage {...props} />} />
      </Routes>
    </BrowserRouter>
    </RecoilRoot>

  );
}


export default App;
