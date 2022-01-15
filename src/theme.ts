import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: { inputProps: { padding: 1.5 } },
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
