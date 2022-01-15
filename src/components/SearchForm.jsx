import { OutlinedInput, Stack, Typography, Link as MUILink } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function SearchForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch(`/api/search?${params}`);
      const result = await res.json();
      setHits(result?.textTvPages);
    }
  };

  return (
    <Stack>
      <OutlinedInput
        onChange={search}
        placeholder="search..."
        sx={{
          borderRadius: 1,
          color: "common.white",
          bgcolor: "background.paper",
        }}
        inputProps={{ sx: { p: 1.5 } }}
      />

      {!!hits.length && (
        <Stack spacing={2}>
          {hits.map((item, index) => (
            <Link passHref href={`/${item.pageNumber}`} key={index}>
              <MUILink>
                <Typography>{item.nickname}</Typography>
              </MUILink>
            </Link>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
