import React, { useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Title from "../Shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../Specific/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../Specific/Profile";
import { useMyChatsQuery } from "../../Redux/api/api";
import Loader from "./Loaders";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../Redux/Reducer/misc";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../Socket";
import { NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../../Constants/constants";
import { setNewMessagesAlert } from "../../Redux/Reducer/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../../dialogs/DeleteChatMenu";
// import ChatList from "../Specific/ChatList"
// import Search from "../Specific"
// import NewGroup from "../Specific/NewGroup"
// import Notification from "../Specific/Notification"

const AppLayout = () => (WrappedComponents) => {
  return (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chatId } = useParams();
    const deleteMenuAnchor = useRef(null);
    const socket = getSocket(); // SOCKET INSTANCE

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
      console.log("New message alert:", newMessagesAlert);
      //  Here we are saving the data in the local storage
    }, [newMessagesAlert]);



   


    // AGGREGATIONG THE USEFUL DATA
    // if (data?.data && Array.isArray(data.data)) {
    //   // Log the name property from each item in the array
    //   data.data.forEach((chat) => {
    //     // console.log(chat.name);
    //   });
    // } else {
    //   console.log("No data available");
    // }



    // Use Ref is Apllied to Directly Manipulate it
    const handleDeleteChat = (e, chatId, groupchat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupchat }));
      deleteMenuAnchor.current = e.currentTarget;
    };



    const handleMobile = () => dispatch(setIsMobile(false));



     // FETCHING THE CHATS DETAILS

     const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        // If you are on the same chat then it will return else it will show the alert that you have new messages from different chats
        // 1 New Messsage = Check
        const MessagePing = data.chatId;
        // It contains The ChatId as well as message Information
        console.log("New Message Alert karo", MessagePing);

        dispatch(setNewMessagesAlert(data)); 
      },
      [chatId]
    );

    // DATA ANALYSIS AND ITS PROPOGATION LEARNING
    // const chatIds = data?.data?.[0]?._id || "";
    // console.log("ChatIds dekho ek bar", chatIds);
    // console.log("params dekho ek bar", chatId);
    // const avatarcard = data?.data?.[0]?.members?.[0]?.avatar;

    const RefetchListner = useCallback(() => {
      console.log("Refetching the chat list");
      refetch();
     }, [refetch]);



    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [REFETCH_CHATS]: RefetchListner,
    };


    useSocketEvents(socket, eventHandler);


    return (
      <>
        <Title title={"Chat App"} />
        <Header />

        {/* Use Ref is Apllied to Directly Manipulate it */}
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor.current}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <Drawer open={isMobile} onClose={handleMobile}>
            <ChatList
              w="70vw"
              chats={data?.data || []}
              chatId={chatId} // Took from useparams
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              // avatar={avatarcard}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          {/* In mui The full size screen contains 12 Columns*/}

          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },

              // For small mobile screen it will be hidden
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <ChatList
                chats={data?.data || []}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={5} height={"100%"}>
            <WrappedComponents {...props} chatId={chatId} user={user} />

            {/* Chat will come here */}
          </Grid>

          <Grid
            item
            md={4}
            lg={4}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "#394867",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
        <div>Footer</div>
      </>
    );
  };
};

export default AppLayout;
