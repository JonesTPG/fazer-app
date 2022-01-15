import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Link as MUILink, OutlinedInput, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchForm() {
  const [hits, setHits] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const search = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch(`/api/search?${params}`);
      const result = await res.json();
      setHits(result?.textTvPages);
    }
    setSearchTerm(q);
  };

  return (
    <Stack>
      <OutlinedInput
        value={searchTerm}
        onChange={search}
        placeholder="search..."
        endAdornment={
          searchTerm ? (
            <IconButton onClick={() => setSearchTerm("")}>
              <CancelIcon />
            </IconButton>
          ) : undefined
        }
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
