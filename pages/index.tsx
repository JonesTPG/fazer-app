import SearchForm from "@components/SearchForm";
import TextTvPageForm from "@components/TextTvPageForm";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React, { FC, useState } from "react";

export const Home: FC<{ textTvPageId: string }> = ({ textTvPageId }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Stack
      sx={{ width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}
      data-testid="container"
      spacing={2}
    >
      <SearchForm />
      <Link href={`/100`} passHref>
        <Button variant="contained" disabled={isClicked} onClick={() => setIsClicked(true)}>
          First page!
        </Button>
      </Link>
      <Link href={`/${textTvPageId}`} passHref>
        <Button variant="contained" disabled={isClicked} onClick={() => setIsClicked(true)}>
          Surprise me!
        </Button>
      </Link>
      <TextTvPageForm />
    </Stack>
  );
};
export default Home;

export const getStaticProps = async () => {
  return { props: { textTvPageId: Math.floor(Math.random() * (800 - 100)) + 100 } };
};
