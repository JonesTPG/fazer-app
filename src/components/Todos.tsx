import { TodoType, UserTodoData } from "@lib/todos";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewTodoModal from "./NewTodoModal";

type Props = {
  data: UserTodoData;
};

const Todos = ({ data }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>(data.todos || []);
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  useEffect(() => {
    fetch("/api/todos/update", {
      method: "POST",
      body: JSON.stringify({ todos }),
    });
  }, [todos]);

  const handleEdit = () => {
    setTodos((old) =>
      old.map((item) => (item.id === selectedTodo ? { ...item, content: editedContent } : item)),
    );
    setEditedContent("");
    setSelectedTodo(null);
  };

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
                p: id === selectedTodo ? 1 : 2,
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "gray",
                  border: "2px solid lightgreen",
                },
              }}
            >
              {id === selectedTodo ? (
                <OutlinedInput
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !!editedContent) {
                      handleEdit();
                    }
                  }}
                  placeholder="TODO..."
                  endAdornment={
                    !!editedContent && (
                      <IconButton onClick={() => handleEdit()}>
                        <CheckRoundedIcon />
                      </IconButton>
                    )
                  }
                  autoFocus
                />
              ) : (
                <>
                  <Typography>{content}</Typography>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setSelectedTodo(id);
                        setEditedContent(content);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setTodos((old) => old.filter((item) => item.id !== id))}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Stack>
          ))}
          <NewTodoModal
            addTodo={(content) => setTodos((old) => [...old, { id: `${old.length}`, content }])}
          />
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
