import { useRouter } from "next/router";
import { Button, Stack, Card } from "@mui/material";
import { useState } from "react";

export default function Home({ min, max }) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Stack
      sx={{ width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}
      data-testid="container"
    >
      <Card
        sx={{
          border: (theme) => `1px solid ${theme.palette.common.white}`,
          borderRadius: "8px",
          p: 2,
          minHeight: 400,
          minWidth: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          disabled={isClicked}
          data-testid={`button${isClicked ? "-disabled" : ""}`}
          onClick={() => {
            setIsClicked(true);
            router.push(`/${Math.floor(Math.random() * max - min) + min}`);
          }}
        >
          Surprise me!
        </Button>
      </Card>
    </Stack>
  );
}

export const getStaticProps = async () => {
  return { props: { min: 100, max: 800 } };
};
