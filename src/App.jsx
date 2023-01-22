import React, { useEffect } from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
import { callFunc } from './Configs/firebase';
import Router from './router';
// import muiTheme from './muiTheme';

function App() {
  const getData = async () => {
    const callable = callFunc('getArticles');

    await callable({})
      .then((res) => {
        console.log('success', res);
      })
      .catch((err) => {
        console.log('anjing', err);
      });
  };

  useEffect(() => {
    getData();
  });

  // const theme = React.useMemo(() => muiTheme);

  const theme = extendTheme({
    colors: {
      blue: {
        50: '#EBF1FC',
        600: '#1C51B5',
      },
    },
  });

  return (
  // <ThemeProvider theme={theme}>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  // </ThemeProvider>
  );
}

export default App;
