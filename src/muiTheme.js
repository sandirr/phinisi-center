const { createTheme } = require('@mui/material/styles');

const muiTheme = createTheme({
  typography: {
    fontFamily: [
      '"Poppins"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '1.6em',
      fontWeight: '600',
      lineHeight: '140%',
    },
    h2: {
      fontSize: '1.4em',
      fontWeight: '600',
      lineHeight: '140%',
    },
    h3: {
      fontSize: '1.2em',
      fontWeight: '600',
      lineHeight: '140%',
    },
    h4: {
      fontSize: '1em',
      fontWeight: '600',
      lineHeight: '140%',
    },
    h5: {
      fontSize: '0.875em',
      fontWeight: '500',
      lineHeight: '120%',
    },
    subtitle1: {
      fontSize: '1em',
      fontWeight: '500',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // padding: '0.25em 1em',
          // borderRadius: 25,
          // fontSize: '0.875em',
          textTransform: 'none',
          // fontWeight: '600',
        },
      },
    },
  },
});

export default muiTheme;
