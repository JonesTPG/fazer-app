import Head from "next/head";
import { ThemeProvider } from "@mui/system";
import theme from "../theme";
import { CssBaseline, Container } from "@mui/material";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Text-TV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
