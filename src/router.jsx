/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Elements from './Components/Elements';
import Pages from './Components/Pages';
import { auth } from './Configs/firebase';
import ROUTES from './Configs/routes';

export default function Router() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedin(!!user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Elements.Header />
      <Routes>
        <Route path="/">
          <Route index element={<Pages.Home />} />
          <Route path="/home" element={<Pages.Home />} />
        </Route>
        <Route path={ROUTES.artikel()}>
          <Route index element={<Pages.Article />} />
          <Route path="buat" element={<Pages.CreateArticle />} />
          <Route path="baca/:id" element={<Pages.DetailArticle />} />
        </Route>
        <Route path={ROUTES.pemesanan()} element={<Pages.Order />}>
          <Route path="vendor/:id" element={<Pages.Order />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Elements.Footer />
    </BrowserRouter>
  );
}
