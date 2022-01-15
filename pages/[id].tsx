import ArrowLeftIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowForwardRounded";
import { Fab, Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";

export const TextTVPage: FC<{ id: string }> = ({ id }) => {
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
      <Fab size="large" onClick={() => router.push(`/${Number(id) - 1}`)}>
        <ArrowLeftIcon />
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
      <Fab size="large" onClick={() => router.push(`/${Number(id) + 1}`)}>
        <ArrowRightIcon />
      </Fab>
    </Stack>
  );
};
export default TextTVPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { id: params?.id || null }, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Array.from(Array(10).keys()).map((i) => ({ params: { id: `${i + 100}` } }));
  return {
    paths,
    fallback: "blocking",
  };
};
