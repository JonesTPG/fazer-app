import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(9, 72, 173, 0.7)",
      light: "rgba(9, 72, 173, 0.4)",
      dark: "rgba(9, 72, 173, 1)",
    },
    secondary: {
      main: "rgba(11, 133, 11, 0.7)",
      light: "rgba(11, 133, 11, 0.4)",
      dark: "rgba(11, 133, 11, 1)",
    },
    text: { primary: "rgba(230, 230, 230, 1)", secondary: "rgba(230, 230, 230, 0.4)" },
    background: { default: "rgba(40, 40, 40, 1)", paper: "rgba(50, 50, 50, 1)" },
    common: { white: "rgba(255, 255, 255, 1)", black: "rgba(0, 0, 0, 1)" },
  },
});
theme.components = {
  MuiTypography: {
    styleOverrides: `
    color: ${theme.palette.text.primary}`,
  },
  MuiCssBaseline: {
    styleOverrides: `
    body{
      background-color: ${theme.palette.background.default}
    }`,
  },
};
export default theme;
