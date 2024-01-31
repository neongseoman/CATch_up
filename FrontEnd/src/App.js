import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUpForm from './pages/SignUpForm'; // 회원가입 폼 import
import Page from './pages/Page';
import ChatApp from './components/ChatApp'
import Streaming from './pages/Streaming'
import { Layout, NavLayout } from './Layouts/DefaultLayout';
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
import StreamingInfo from "./pages/StreamingInfo";

function App() {
  return (
      <RecoilRoot>
          <BrowserRouter>
              <Routes>
                  <Route element={<NavLayout />}>
                      <Route path='/' element={<Main />} />
                      <Route path='/page/:pageId' element={<Page />} />
                  </Route>
                  <Route path="user" element={<Layout />}>
                      <Route path='login' element={<Login />} />
                      <Route path='logout' element={<Login />} />
                  </Route>
                  <Route path="streamingpage" element={<StreamingPage />}>
                  </Route>
                  {/*// 방송하기*/}
                  <Route path="streaming" element={<Layout />}>
                      <Route path='info' element={<StreamingInfo />} />
                      <Route path='onAir' element={<Streaming />} />
                  </Route>
                  {/*시청하기*/}
                  {/*<Route path='/watching' element={<Watching />} />*/}
              </Routes>
          </BrowserRouter>
      </RecoilRoot>
  );
}


export default App;
