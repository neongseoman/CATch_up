import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Page from './pages/Page';
import { Layout, NavLayout } from './Layouts/DefaultLayout';
import React, { useEffect } from 'react';
import Streaming from "./pages/Streaming";
import {Button} from "./components/Button";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<Main />} />
          <Route path='/page/:pageId' element={<Page />} />
            <Route path='/streaming' element={<Streaming />} />
        </Route>
        <Route path="user" element={<Layout />}>
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
