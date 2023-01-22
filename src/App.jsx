import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
// import { callFunc } from './Configs/firebase';
import Router from './router';

function App() {
  // const getData = async () => {
  //   const callable = callFunc('getArticles');

  //   await callable({})
  //     .then((res) => {
  //       console.log('success', res);
  //     })
  //     .catch((err) => {
  //       console.log('anjing', err);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // });

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
