import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Page from './pages/Page';
import { Layout, NavLayout } from './Layouts/DefaultLayout';
import { useEffect } from 'react';

function App() {

  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
