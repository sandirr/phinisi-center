import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { callFunc } from './Configs/firebase';
import Router from './router';
import muiTheme from './muiTheme';

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

  const theme = React.useMemo(() => muiTheme);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
