import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import { Box, IconButton, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type ChatBotMessage = {
  msg: string;
  sentByBot: boolean;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatBotMessage[]>([
    { msg: "I'm here!", sentByBot: true },
    { msg: "Yeah, right...", sentByBot: false },
    { msg: "HV", sentByBot: true },
  ]);
  const [chatMessage, setChatMessage] = useState<string>("");

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    setMessages((old) => [...old, { sentByBot: false, msg: chatMessage }]);
    setChatMessage("");
    setTimeout(() => {
      setMessages((old) => [...old, { sentByBot: true, msg: "💩" }]);
    }, 2000);
  };

  return (
    <Paper sx={{ position: "absolute", right: 20, bottom: 20, borderRadius: 2, p: 2, width: 300 }}>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <SmartToyRoundedIcon />
          <Typography variant="h6">Your new friend, ChatBot!</Typography>
        </Stack>
        <Stack sx={{ overflow: "auto", maxHeight: 350, pr: 1 }}>
          {messages.map(({ msg, sentByBot }, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: sentByBot ? "start" : "end",
                backgroundColor: sentByBot ? "#980F5A" : "#4872c5",
                borderRadius: 4,
                maxWidth: 225,
                overflowWrap: "break-word",
                my: 0.25,
                px: 1,
                py: 0.5,
              }}
            >
              <Typography color="whitesmoke">{msg}</Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>

        <OutlinedInput
          placeholder="chat..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !!chatMessage) {
              handleSend();
            }
          }}
          sx={{ borderRadius: 10, backgroundColor: "#5d698a" }}
          size="small"
          endAdornment={
            !!chatMessage && (
              <IconButton onClick={() => handleSend()}>
                <ArrowForwardRoundedIcon />
              </IconButton>
            )
          }
        />
      </Stack>
    </Paper>
  );
};

export default ChatBot;
