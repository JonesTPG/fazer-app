import { TodoType, UserTodoData } from "@lib/todos";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import NewTodoModal from "./NewTodoModal";

type Props = {
  data: UserTodoData;
};

const Todos = ({ data }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>(data.todos || []);
  return (
    <Stack justifyContent={"center"} spacing={2}>
      {!!todos.length ? (
        <>
          <Typography variant="h5" textAlign="center" fontWeight={400}>
            {`Welcome back ${data.username}!`}
          </Typography>
          {todos.map(({ id, content }) => (
            <Stack
              key={id}
              direction={{ xs: "column", sm: "row" }}
              sx={{
                borderRadius: 2,
                border: "2px solid white",
                p: 1,
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "gray",
                  border: "2px solid lightgreen",
                },
              }}
            >
              <Typography>{content}</Typography>
              <Box>
                <IconButton onClick={() => console.log("edit", { id })}>
                  <EditRoundedIcon />
                </IconButton>
                <IconButton onClick={() => setTodos((old) => old.filter((item) => item.id !== id))}>
                  <DeleteRoundedIcon />
                </IconButton>
              </Box>
            </Stack>
          ))}
        </>
      ) : (
        <NewTodoModal
          addTodo={(content) => setTodos((old) => [...old, { id: `${old.length}`, content }])}
          name={data.username}
        />
      )}
    </Stack>
  );
};

export default Todos;
