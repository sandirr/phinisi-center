import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/id';
import './App.css';
// import { callFunc } from './Configs/firebase';
import Router from './router';

moment.locale('id');

function App() {
  const theme = extendTheme({
    colors: {
      blue: {
        50: '#EBF1FC',
        600: '#1C51B5',
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
