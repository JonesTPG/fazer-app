import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Dialog, Fab, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";

type Props = {
  name?: string;
  addTodo: (todo: string) => void;
};

const NewTodoModal: FC<Props> = ({ name = "", addTodo }) => {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(false);
    addTodo(content);
    setContent("");
  };

  return (
    <Stack justifyContent="center" spacing={2}>
      {!!name && (
        <>
          <Typography variant="h5" textAlign="center" fontWeight={400}>
            {`Welcome ${name}!`}
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={400}
            sx={{ pt: { xs: 3, sm: 20 } }}
          >
            Create your first TODO
          </Typography>
        </>
      )}
      <Fab sx={{ alignSelf: "center" }} onClick={() => setOpen(true)}>
        <AddRoundedIcon />
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Stack sx={{ justifyContent: "center", alignItems: "center", p: 4 }}>
          <OutlinedInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !!content) {
                handleAdd();
              }
            }}
            placeholder="TODO..."
            endAdornment={
              !!content && (
                <IconButton onClick={() => handleAdd()}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              )
            }
            autoFocus
          />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default NewTodoModal;
