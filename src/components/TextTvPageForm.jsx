import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function TextTvPageForm() {
  const [values, setValues] = useState({ pageNumber: "", nickname: "", reason: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (prop) => (event) => {
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
    console.log("Saved: ", { result });
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
      <Button variant="contained" onClick={handleClickOpen}>
        Create a new text-tv page
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new text-tv page</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <OutlinedInput
              sx={{
                borderRadius: 1,
                color: "common.white",
                bgcolor: "background.paper",
              }}
              placeholder="Page number*"
              value={values.pageNumber}
              onChange={handleChange("pageNumber")}
              inputProps={{ sx: { p: 1.5 } }}
            />
            <OutlinedInput
              sx={{
                borderRadius: 1,
                color: "common.white",
                bgcolor: "background.paper",
              }}
              placeholder="Nickname*"
              value={values.nickname}
              onChange={handleChange("nickname")}
              inputProps={{ sx: { p: 1.5 } }}
            />
            <OutlinedInput
              sx={{
                borderRadius: 1,
                color: "common.white",
                bgcolor: "background.paper",
              }}
              placeholder="Reason"
              value={values.reason}
              onChange={handleChange("reason")}
              inputProps={{ sx: { p: 1.5 } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleSubmit()}>
            Create
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
