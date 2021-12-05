import { Stack } from "@mui/material";
import Image from "next/image";

export default function Home({ id }) {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 3px 10px rgb(255 255 255 / 0.2)",
        p: 0.2,
      }}
      data-testid="container"
    >
      <Image src={`/api/textTvImage/${id}`} alt="Text TV page" width={800} height={650} />
    </Stack>
  );
}
export async function getStaticProps({ params }) {
  return { props: { id: params.id }, revalidate: 300 };
}

export async function getStaticPaths() {
  const paths = Array.from(Array(10).keys()).map((i) => ({ params: { id: `${i + 101}` } }));
  return {
    paths,
    fallback: "blocking",
  };
}
