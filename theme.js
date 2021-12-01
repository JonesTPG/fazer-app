import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#104982", light: "#1e5a96", dark: "#073b70" },
    secondary: { main: "#245745", light: "#245745", dark: "#245745" },
    text: { main: "#245745", light: "#245745", dark: "#245745" },
    background: { default: "#1f2021", paper: "#1f2021" },
    common: { white: "#fff", black: "#000" },
  },
});
theme.components = {
  MuiCssBaseline: {
    styleOverrides: `
    body{
      background-color: ${theme.palette.background.default}
    }`,
  },
};
export default theme;
