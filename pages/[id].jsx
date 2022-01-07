import { Stack, Fab, Typography } from "@mui/material";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Home({ id }) {
  const router = useRouter();
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
      direction="row"
      spacing={4}
    >
      <Fab
        color="secondary"
        aria-label="add"
        size="large"
        onClick={() => router.push(`/${id - 1}`)}
      >
        <ArrowCircleLeftTwoToneIcon />
      </Fab>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: 0.2,
        }}
        data-testid="container"
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.common.white,
            fontWeight: "600",
          }}
          variant="h2"
        >
          {id}
        </Typography>
        <Image src={`/api/textTvImage/${id}`} alt="Text TV page" width={800} height={650} />
      </Stack>
      <Fab
        color="secondary"
        aria-label="add"
        size="large"
        onClick={() => router.push(`/${Number(id) + 1}`)}
      >
        <ArrowCircleRightTwoToneIcon />
      </Fab>
    </Stack>
  );
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id }, revalidate: 300 };
}

export async function getStaticPaths() {
  const paths = Array.from(Array(10).keys()).map((i) => ({ params: { id: `${i + 100}` } }));
  return {
    paths,
    fallback: "blocking",
  };
}
