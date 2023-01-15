/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './Components/Pages';
import { auth } from './Configs/firebase';

export default function Router() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedin(!!user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Pages.Home />} />
          <Route path="/beranda" element={<Pages.Home />} />
        </Route>
        <Route path="/article">
          <Route index element={<div>list articles</div>} />
          <Route path="create" element={<Pages.CreateArticle />} />
          <Route path="read/:id" element={<div>test read articles</div>} />
        </Route>
        <Route path="/auth" element={<Pages.Auth />} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
