import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { getStaticProps } from ".";

const MakePage = ({ works = false }) => {
  const [count, setCount] = useState(0);
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Box
        sx={{ border: (theme) => `1px solid ${theme.palette.common.white}`, borderRadius: "8px" }}
      >
        <Typography sx={{ fontWeight: 600, color: "common.white" }}>Count box!</Typography>
        <Stack direction="row">
          <Button
            onClick={() => setCount((currentCount) => currentCount + 1)}
            sx={{ color: "common.white" }}
          >
            +
          </Button>
          <Button
            onClick={() => setCount((currentCount) => currentCount + 1)}
            sx={{ color: "common.white" }}
          >
            -
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default MakePage;

export const getStaticProps = async (ctx) => {
  return { props: { works: true } };
};
