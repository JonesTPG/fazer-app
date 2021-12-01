import { Card } from "@mui/material";
import Image from "next/image";

export default function Home({ textTvImage, id }) {
  return (
    <Card
      sx={{
        border: (theme) => `1px solid ${theme.palette.common.white}`,
        borderRadius: "8px",
        p: 2,
      }}
    >
      <Image src={"mock"} alt="Text TV page" width="600" height="400" />
    </Card>
  );
}
export async function getStaticProps({ params }) {
  let data;
  try {
    const res = await fetch(`http://localhost:3000/api/textTvImage/${params.id}`, {
      method: "GET",
    });
    const data = await res.json();
  } catch (error) {
    data = null;
  }

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { textTvImage: data, id: params.id }, revalidate: 300 };
}

export async function getStaticPaths() {
  const paths = Array.from(Array(10).keys()).map((i) => ({ params: { id: `${i + 101}` } }));
  return {
    paths,
    fallback: "blocking",
  };
}
