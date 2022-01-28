import Todos from "@components/Todos";
import { UserTodoData } from "@lib/todos";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import { CircularProgress, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const TodoPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<UserTodoData | null>(null);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const getData = async (): Promise<UserTodoData | null> => {
      const res = await fetch("/api/todos/read");
      if (res.status === 400) {
        return null;
      }
      return ((await res.json()) as { data: UserTodoData }).data;
    };
    getData().then((res) => {
      setLoading(false);
      setData(res);
    });
  }, []);

  return (
    <Stack>
      {loading ? (
        <CircularProgress />
      ) : !!data?.username ? (
        <Todos data={data} />
      ) : (
        <Stack justifyContent="center" spacing={3}>
          <Typography variant="h5" textAlign="center" fontWeight={400}>
            What should we call you?
          </Typography>
          <OutlinedInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username..."
            endAdornment={
              !!username ? (
                <IconButton
                  onClick={() =>
                    fetch("/api/todos/create", {
                      method: "POST",
                      body: JSON.stringify({ username }),
                    })
                  }
                >
                  <ArrowForwardRoundedIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => console.log("surprise")}>
                  {/*FIXME: generate random username with https://randomuser.me/api/ */}
                  <QuestionMarkRoundedIcon />
                </IconButton>
              )
            }
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TodoPage;
