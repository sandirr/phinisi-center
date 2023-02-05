/* eslint-disable no-unused-vars */
import { createContext } from 'react';

export const LoginContext = createContext({
  showPopUpLogin: () => null,
  closePopUpLogin: () => null,
  loggedin: null,
});

export const ConfirmationContext = createContext({
  showConfirmation: () => null,
  closeConfirmation: () => null,
});

export const ChatModalContext = createContext({
  showChatModal: () => null,
  closeChatModal: () => null,
});

export const OrderModalContext = createContext({
  showOrderModal: () => null,
  closeOrderModal: () => null,
});
