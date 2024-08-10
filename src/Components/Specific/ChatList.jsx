import { Stack } from "@mui/material";
import React from "react";
import { Samplechats } from "../../Constants/SampleData";
import ChatItem from "../Shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
  avatar,
}) => {

  const alerts = Array.isArray(newMessagesAlert) ? newMessagesAlert : [];

  // console.log("Chats: ", chats);
  // console.log("Current Chat ID: ", chatId);
  // console.log("new messags alert", newMessagesAlert);
  // console.log("new messags alert", alerts);
  // console.log("checking of avatar", avatar);

  return (
    <Stack
      width={w}
      direction={"column"}
      bgcolor="#EDEEF7"
      sx={{
        overflow: "auto",
        height: "100%",
      }}
    >
      {chats.length === 0 && <div>No chats available</div>}

      {chats?.map((data , index) => {
        const { name, _id, groupChat, members } = data;

        const Messagealert = alerts.find(
          ({ chatId }) => chatId === _id
        );
        const isonline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        {/* console.log("chatID check kar", chatId); */}
        {/* console.log("_id check hai ", _id); */}

        return (
          <ChatItem
            index={index}
            Messagealert={Messagealert}
            isonline={isonline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupchat={groupChat}
            samesender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
