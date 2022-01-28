import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Fab, IconButton, Modal, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";

type Props = {
  name?: string;
  addTodo: (todo: string) => void;
};

const NewTodoModal: FC<Props> = ({ name = "", addTodo }) => {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Stack justifyContent="center" spacing={2}>
      <Typography variant="h5" textAlign="center" fontWeight={400}>
        {`Welcome ${name}!`}
      </Typography>
      <Typography variant="h5" textAlign="center" fontWeight={400} sx={{ pt: { xs: 3, sm: 20 } }}>
        Create your first TODO
      </Typography>
      <Fab sx={{ alignSelf: "center" }} onClick={() => setOpen(true)}>
        <AddRoundedIcon />
      </Fab>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack>
          <OutlinedInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="TODO..."
            endAdornment={
              !!content && (
                <IconButton onClick={() => addTodo(content)}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              )
            }
          />
        </Stack>
      </Modal>
    </Stack>
  );
};

export default NewTodoModal;
