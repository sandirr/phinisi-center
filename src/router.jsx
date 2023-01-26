import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter, Route, Routes, useLocation,
} from 'react-router-dom';
import Elements from './Components/Elements';
import Pages from './Components/Pages';
import { admins } from './Configs/constants';
import { auth } from './Configs/firebase';
import ROUTES from './Configs/routes';
import { LoginContext, ConfirmationContext } from './Context';

export default function Router() {
  const [loggedin, setLoggedin] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(user);
      } else {
        setLoggedin(null);
      }
    });
  }, []);

  const [openLogin, setOpenLogin] = useState(false);

  const showPopUpLogin = () => {
    setOpenLogin(true);
  };

  const closePopUpLogin = () => {
    setOpenLogin(false);
  };

  const loginValue = useMemo(() => ({
    showPopUpLogin,
    closePopUpLogin,
    loggedin,
  }), [loggedin]);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [agreeProps, setAgreeProps] = useState(null);

  const showConfirmation = (prop) => {
    setOpenConfirmation(true);
    setAgreeProps(prop);
  };

  const closeConfirmation = () => {
    setOpenConfirmation(false);
  };

  const confirmationValues = useMemo(() => ({
    showConfirmation,
    closeConfirmation,
  }), []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoginContext.Provider value={loginValue}>
        <ConfirmationContext.Provider value={confirmationValues}>
          <Elements.Login open={openLogin} handleClose={closePopUpLogin} />
          <Elements.Confirmation
            open={openConfirmation}
            handleClose={closeConfirmation}
            {...agreeProps}
          />
          <Elements.Header />
          <Routes>
            <Route path="/">
              <Route index element={<Pages.Home />} />
              <Route path="/home" element={<Pages.Home />} />
            </Route>
            <Route path={ROUTES.artikel()}>
              <Route index element={<Pages.Article />} />
              {/* <Route path="buat" element={<Pages.CreateArticle />} /> */}
              <Route path="baca/:id" element={<Pages.DetailArticle />} />
            </Route>
            <Route path={ROUTES.pemesanan()}>
              <Route index element={<Pages.Order />} />
              <Route path="vendor/:id" element={<Pages.DetailVendor />} />
            </Route>
            {!!loggedin && admins.includes(loggedin.email.toLowerCase())
          && <Route path={ROUTES.admin()} element={<Pages.Admin />} />}
            <Route path="*" element={<div>404</div>} />
          </Routes>
          <Elements.Footer />
        </ConfirmationContext.Provider>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}
