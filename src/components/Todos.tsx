import { TodoType, UserTodoData } from "@lib/redis";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, Fab, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  data: UserTodoData;
};

const Todos = ({ data }: Props) => {
  const todos: TodoType[] = data.todos || [];
  //    || [
  //     { id: "1", content: "Add TypeScript!" },
  //     { id: "2", content: "Add TypeScript!" },
  //     { id: "3", content: "Add TypeScript!" },
  //   ];
  return (
    <Stack justifyContent={"center"} spacing={2}>
      {!todos.length ? (
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
                <IconButton onClick={() => console.log("delete", { id })}>
                  <DeleteRoundedIcon />
                </IconButton>
              </Box>
            </Stack>
          ))}
        </>
      ) : (
        <Stack justifyContent="center" spacing={2}>
          <Typography variant="h5" textAlign="center" fontWeight={400}>
            {`Welcome ${data.username}!`}
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={400}
            sx={{ pt: { xs: 3, sm: 20 } }}
          >
            Create your first TODO
          </Typography>
          <Fab sx={{ alignSelf: "center" }} onClick={() => console.log("add")}>
            <AddRoundedIcon />
          </Fab>
        </Stack>
      )}
    </Stack>
  );
};

export default Todos;
