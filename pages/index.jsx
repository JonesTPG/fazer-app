import { useRouter } from "next/router";
import { Button, Stack, Card } from "@mui/material";

export default function Home({ min, max }) {
  const router = useRouter();
  return (
    <Stack sx={{ width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}>
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
          onClick={() => router.push(`/${Math.floor(Math.random() * max - min) + min}`)}
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
