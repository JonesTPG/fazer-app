import { Input, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function SearchForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch(`/api/search?${params}`);
      const result = await res.json();
      console.log(result);
      setHits([]);
    }
  };

  return (
    <Stack>
      <Input
        onChange={search}
        placeholder="search..."
        sx={{
          borderRadius: 1,
          border: (theme) => `2px solid ${theme.palette.primary.main}`,
          color: "common.white",
          pl: 1,
        }}
        disableUnderline
      />

      {!!hits.length && (
        <Stack spacing={2}>
          {hits.map((_, index) => (
            <Typography key={index}>HIT</Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
