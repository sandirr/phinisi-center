import {
  Box,
  Container, Heading, Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter, Route, Routes, useLocation,
} from 'react-router-dom';
import Elements from './Components/Elements';
import Pages from './Components/Pages';
import { admins } from './Configs/constants';
import { auth } from './Configs/firebase';
import ROUTES from './Configs/routes';
import {
  LoginContext, ConfirmationContext, ChatModalContext, OrderModalContext,
} from './Context';

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
  const [confirmationProps, setConfirmationProps] = useState(null);

  const showConfirmation = (prop) => {
    setOpenConfirmation(true);
    setConfirmationProps(prop);
  };

  const closeConfirmation = () => {
    setOpenConfirmation(false);
  };

  const confirmationValues = useMemo(() => ({
    showConfirmation,
    closeConfirmation,
  }), []);

  const [openChat, setOpenChat] = useState(false);
  const [chatModalProps, setChatModalprops] = useState(null);

  const showChatModal = (prop) => {
    if (auth.currentUser) {
      setOpenChat(true);
      setChatModalprops(prop);
    } else {
      showPopUpLogin();
    }
  };

  const closeChatModal = () => {
    setOpenChat(false);
  };

  const chatModalValues = useMemo(() => ({
    showChatModal,
    closeChatModal,
  }), []);

  const [openOrder, setOpenOrder] = useState(false);
  const [orderModalProps, setOrderModalProps] = useState(null);

  const showOrderModal = (prop) => {
    if (auth.currentUser) {
      setOpenOrder(true);
      setOrderModalProps(prop);
    } else {
      showPopUpLogin();
    }
  };

  const closeOrderModal = () => {
    setOpenOrder(false);
  };

  const orderModalValues = useMemo(() => ({
    showOrderModal,
    closeOrderModal,
  }), []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoginContext.Provider value={loginValue}>
        <ConfirmationContext.Provider value={confirmationValues}>
          <ChatModalContext.Provider value={chatModalValues}>
            <OrderModalContext.Provider value={orderModalValues}>
              <Elements.Login open={openLogin} handleClose={closePopUpLogin} />
              <Elements.Confirmation
                open={openConfirmation}
                handleClose={closeConfirmation}
                {...confirmationProps}
              />
              <Elements.ChatModal
                open={openChat}
                handleClose={closeChatModal}
                {...chatModalProps}
              />
              <Elements.FixOrder
                open={openOrder}
                handleClose={closeOrderModal}
                {...orderModalProps}
              />
              <Box minHeight="100vh">
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
                  <Route
                    path="*"
                    element={(
                      <Container maxW="7xl" py="4">
                        <Heading size="md">Oops Halaman Tidak Ditemukan!</Heading>
                        <Text>Error 404</Text>
                      </Container>
                  )}
                  />
                </Routes>
              </Box>
              <Elements.Footer />
            </OrderModalContext.Provider>
          </ChatModalContext.Provider>
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
