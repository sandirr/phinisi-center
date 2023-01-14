import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pages from './Components/Pages';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Pages.Beranda />} />
          <Route path="/beranda" element={<Pages.Beranda />} />
        </Route>
        <Route path="/article">
          <Route index element={<div>list articles</div>} />
          <Route path="create" element={<div>test read articles</div>} />
          <Route path="read/:id" element={<div>test read articles</div>} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
