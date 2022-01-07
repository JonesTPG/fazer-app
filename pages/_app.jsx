import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Head from "next/head";
import theme from "../src/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Text-TV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1920,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
