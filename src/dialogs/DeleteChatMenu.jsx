import { Menu, Stack, Typography } from "@mui/material";
import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../Redux/Reducer/misc";
import { useNavigate } from "react-router-dom";
import { useAsycMutation } from "../hooks/hook";
import { useDeleteChatMutation } from "../Redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, _, deleteChatData] = useAsycMutation(
    useDeleteChatMutation
  );

  const [leaveGroup, __, leaveChatData] = useAsycMutation(
    useDeleteChatMutation
  );

  const isGroup = selectedDeleteChat.groupChat;

  const closeHanlder = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const LeaveGroupHandler = () => {
    closeHanlder();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  const deleteHandler = () => {
    closeHanlder();
    deleteChat("deleting chat...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveChatData) navigate("/home");
  }, [deleteChatData, leaveChatData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHanlder}
      anchorEl={deleteMenuAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          height: "2rem",
          cursor: "pointer",
        }}
        direction={"column"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? LeaveGroupHandler : deleteHandler}
      >
        {isGroup ? (
          <Typography>Leave Group</Typography>
        ) : (
          <Typography>DeleteChat</Typography>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
