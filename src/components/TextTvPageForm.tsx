import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Stack,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";

export interface FavoritePageInput {
  pageNumber: string;
  nickname: string;
  reason: string;
}

export default function TextTvPageForm() {
  const [values, setValues] = useState<FavoritePageInput>({
    pageNumber: "",
    nickname: "",
    reason: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange =
    (prop: keyof FavoritePageInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setValues((old) => ({ ...old, [prop]: event.target.value }));
    };

  const handleSubmit = async () => {
    if (!values.pageNumber || !values.nickname) {
      return null;
    }

    const res = await fetch("/api/textTvPages", {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    setOpen(false);
    setValues({ pageNumber: "", nickname: "", reason: "" });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Save your favorite page!</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add favorites</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <OutlinedInput
              placeholder="Page number*"
              value={values.pageNumber}
              onChange={handleChange("pageNumber")}
            />
            <OutlinedInput
              placeholder="Nickname*"
              value={values.nickname}
              onChange={handleChange("nickname")}
            />
            <OutlinedInput
              placeholder="Reason"
              value={values.reason}
              onChange={handleChange("reason")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Save</Button>
          <Button onClick={handleClose} variant="text" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
