import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUpForm from './pages/SignUpForm'; // 회원가입 폼 import
import Page from './pages/Page';

import UserInfo from './pages/UserInfo';
import {  NavLayout,NavLayoutWithoutDefault } from './Layouts/DefaultLayout';
import ErrorPage from './pages/ErrorPage';
import MainMapPage from './pages/MainMapPage'
import MyProfilePage from './pages/MyProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import SearchResultPage from './pages/SearchResultPage';
import Streaming from './pages/Streaming'
import React, { useEffect } from 'react';
import StreamingPage from "./pages/StreamingPage";
import ShortsUpload from './pages/ShortsUpload';
import ShortsDetail from './pages/ShortsDetail';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import Audience from "./pages/WatchingPage";

import StreamingInfo from "./pages/StreamingInfo";
import WatchingPage from "./pages/WatchingPage";
import TmpFollowPage from "./pages/TmpFollowPage"
import Watching from "./pages/Watching";

function App() {
  return (
      <RecoilRoot>
          <BrowserRouter>
              <Routes>
                  <Route element={<NavLayout />}>
                      <Route path='/' element={<Main />} />
                      <Route path='/page/:pageId' element={<Page />} />
                      <Route path='/searchresult' element={<SearchResultPage />} />
                      <Route path='/tmpfollowpage' element={<TmpFollowPage userId={"user2@example.com"}/>} />
                  </Route>
                  
                  <Route path="user" element={<NavLayout />}>
                      <Route path='login' element={<Login />} />
                      <Route path='logout' element={<Login />} />
                      <Route path='signup' element={<SignUpForm />} />
                      <Route path='info' element={<UserInfo />} />
                      <Route path='myprofilepage' element={<MyProfilePage />} />
                  </Route>
                  
                  <Route path="streaming" element={<NavLayout />}>
                      <Route path='info' element={<StreamingInfo />} />
                       {/*<Route path='onair' element={<Streaming />} />*/}
                      <Route path='shorts' element={<ShortsUpload />} />
                       {/*<Route path='watching' element={<Watching />} />*/}
                  </Route>

                  <Route path="user" element={<NavLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='logout' element={<Login />} />
                    <Route path='signup' element={<SignUpForm />} />
                    <Route path='info' element={<UserInfo />} />
                    <Route path='myprofilepage' element={<MyProfilePage />} />
                    <Route path='userprofilepage/:id' element={<UserProfilePage />} />
                    <Route path='shortsdetail/:streamNo' element={<ShortsDetail />} />
                  </Route>

                  <Route element={<NavLayoutWithoutDefault />}>
                    <Route path='map' element={<MainMapPage />} />
                    {/*<Route path="streamingpage" element={<StreamingPage />} />*/}
                    <Route path="watchingpage" element={<WatchingPage />} />
                  </Route>
                  
                  <Route path="/error" render={(props) => <ErrorPage {...props} />} />
              </Routes>
          </BrowserRouter>
      </RecoilRoot>
  );
}


export default App;
