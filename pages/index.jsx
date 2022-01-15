import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SearchForm from "../src/components/SearchForm";
import TextTvPageForm from "../src/components/TextTvPageForm";

export default function Home({ textTvPageId }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Stack
      sx={{ width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}
      data-testid="container"
      spacing={2}
    >
      <SearchForm />
      <Link href={`/${textTvPageId}`} passHref>
        <Button
          variant="contained"
          disabled={isClicked}
          data-testid={`button${isClicked ? "-disabled" : ""}`}
          onClick={() => setIsClicked(true)}
          sx={{ p: 1.5 }}
        >
          Surprise me!
        </Button>
      </Link>
      <TextTvPageForm />
    </Stack>
  );
}

export const getStaticProps = async () => {
  return { props: { textTvPageId: Math.floor(Math.random() * (800 - 100)) + 100 } };
};
