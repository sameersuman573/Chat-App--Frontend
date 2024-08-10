import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { IconButton, Input, Stack, Box } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../Components/BasicStyle.Components";
import Filemenu from "../dialogs/Filemenu";
import MessageComponent from "../Components/Shared/MessageComponent";
import { getSocket } from "../Socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
  START_TYPING,
  STOP_TYPING,
} from "../Constants/constants";
import { useSendMessageOnlyMutation } from "../Redux/api/api";
import { useChatDetailsQuery, useGetMessagesQuery } from "../Redux/api/api";
import Loader from "../Components/Layout/Loaders";
import { useNavigate, useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../Redux/Reducer/misc";
import { removeNewMessagesAlert } from "../Redux/Reducer/chat";
import api from "../Redux/api/api";
import { getOrSaveFromStorage } from "../lib/features";

// PROBLEMS
// 1. new message saved in local storage is not being recieved at another side it shows 1 new message but doesnot show the message

const Chat = ({chatId , user}) => {
  // RECOMMENDED - ALL HOOKS SHOULD BE AT THE TOP OF THE FUNCTION
  const socket = getSocket();
  const containedRef = useRef(null);
  const bottomref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const { chatId } = useParams();
  // const { user } = useSelector((state) => state.auth);

  // Grabbing the new typed message
  const [message, setmessage] = useState("");
  // storing the message in the Array of messages
  const [messages, setmessages] = useState([]);
  // Page for infinite scrolfalsetruel
  const [page, setpage] = useState(1);
  const [limit] = useState(10); // Define a constant limit
  const [filemenuAnchor, setfilemenuAnchor] = useState(null);
  const [typing, settyping] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setuserTyping] = useState(false);
  const typingTimeout = useRef(null);

  // console.log("The user is typing stack", userTyping);
  // ***************************
 const [sendMessageOnly] = useSendMessageOnlyMutation();
  // -------------------------//////////////
  const {
    data: chatDetails,
    isLoading: isLoadingChat,
    isError: isErrorChat,
    error: errorChat,
  } = useChatDetailsQuery(chatId);

  // WE ARE USING THE MESSAGE QUERY HERE BECAUSE FROM HERE WE WILL GET THE CHATID AND FURTHER INFORMATION
  const {
    data: OldMessages,
    isLoading: isLoadingMessages,
    isError: isErrorMessage,
    error: errorMessages,
    refetch,
   } = useGetMessagesQuery({ chatId, page, limit });

  // console.log("refteching the data" , refetch);

  // INFINITE SCROLL
  const { data: oldmessages, setData: setoldmessages } = useInfiniteScrollTop(
    containedRef,
    OldMessages?.totalPages,
    page,
    setpage,
    OldMessages?.data || []
  );
  // ------------------------------


  // console.log("useGetMessagesQuery", OldMessages);
  // console.log("useInfiniteScrollTop", oldmessages);


  
  // console.log("useInfiniteScrollTop setting", setoldmessages);


  // console.log("total pages", OldMessages?.totalPages);
  // console.log("Old Messages alag hai", OldMessages?.data);
 

   // Handling errors
   const errors = [
    {
      isError: isErrorChat,
      error: errorChat,
    },
    {
      isError: isErrorMessage,
      error: errorMessages,
    },
  ];




  const Chatmembers = chatDetails?.data?.members.map((mem) => mem._id || []);
  // console.log("Chat Members check karo ek bar", Chatmembers);





  const messageOnChange = (e) => {
    setmessage(e.target.value);
     if (!typing) {
      socket.emit(START_TYPING, { chatId, members: Chatmembers });
      settyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId, members: Chatmembers });
      settyping(false);
    }, [2000]);
  };







  const HandleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setfilemenuAnchor(e.currentTarget);
  };



  const handleNewMessage = useCallback((data) => {
    if(data.chat === chatId){
      setmessages((prevMessages) => [...prevMessages , data])
    }
  },
  [chatId])



  useEffect(() => {
socket.on(NEW_MESSAGE , handleNewMessage)

return () => {
  socket.off(NEW_MESSAGE , handleNewMessage)
}
  }, [handleNewMessage ,socket ])
  


  const submitMessage = async (e) => {
   
    // doubt why it is kept outside the try block
   try {
    e.preventDefault();
    if (!message.trim()) return;
    // EMITTING MESSAGES TO THE SERVER
    //  socket.emit(NEW_MESSAGE, { chatId, members: Chatmembers, message });
    //  setmessages((prevMessages) => [...prevMessages, message ]);

    await sendMessageOnly({chatId , message: message}).unwrap();
     setmessage("");
     console.log(message);
   } catch (error) {
    console.error('Failed to send message:', error);

   }

    // dispatch(api.util.invalidateTags([{ type: "Messages", id: chatId }]));
  };

 


  

  const RefetchListner = useCallback(() => {
    console.log("Refetching the chat list");
    refetch();
   }, [refetch]);


  // // Refetching the messages ---------------------------------------------
  // const RefetchListner = useCallback(() => {
  //   console.log("Refetching the chat list");
  //    refetch()
  // },[refetch])





//**************************************
useEffect(() => {
  if (OldMessages) {
     setmessages((prevMessages) => [...OldMessages.data, ...prevMessages]);
   }
}, [
  OldMessages , chatId
]);
// *****************************************
 




  // console.log("Chat Details", chatDetails?.data);









  // *********************
  // When the chatId changes a reload is required to fetch messages of different chat so removing the issue by setting all things to empty first
  useEffect(() => {
    // when you will go on a particular chat Then number of unseen messages count will become 0 as you have become updated
socket.emit(CHAT_JOINED, {userId:user._id , members:Chatmembers})
dispatch(removeNewMessagesAlert(chatId));

const fetchMessages = async () => {
  try {
     await refetch();
  } catch (error) {
    console.error('Failed to refetch messages:', error); // Catches any errors that occur

  }
};

fetchMessages();


return () => {
  setmessages([]);
  setmessage("");
  setpage(1);
  setoldmessages([]);
  socket.emit(CHAT_LEAVED, {userId:user._id , members:Chatmembers})
}

  }, [
    chatId,
    refetch, dispatch
     ]);





  useEffect(() => {
    if (bottomref.current) {
      bottomref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    messages
  ]);


  useEffect(() => {
    if (isErrorChat) return navigate("/home");
  }, [isErrorChat]);





  // ---------------------------------------------------------------
  useEffect(() => {
    const storedmessage = getOrSaveFromStorage({
      key: NEW_MESSAGE_ALERT,
      get: true,
    });

    if (storedmessage) {
      setmessages(storedmessage);
    }
  }, [
    chatId
  ]);
  // ---------------------------------------------------------------



// *****************************************************
const newMessageHandler = useCallback(
  (data) => {
    // Make Sure that new messages are not appended in someother chats
    //  -- Append only if chatId is same else return--
    // -- because on unmounting chats chatId changes
    if (data.chatId !== chatId) return;
    setmessages((prev) => [...prev, data.message]);
  },
  [chatId]
);
// *****************************************************



   // TYPING LISTNERS
   const StartTypingListener = useCallback(
    (data) => {
      console.log("User is typing in chat: ", data);
      if (data.chatId === chatId) {
        setuserTyping(true);
      }
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      console.log("User is not typing in chat: ", data);
      if (data.chatId === chatId) {
        setuserTyping(false);
      }
    },
    [chatId]
  );




  useEffect(() => {
    socket.on(START_TYPING, StartTypingListener);
    socket.on(STOP_TYPING, stopTypingListener);

    return () => {
      socket.off(START_TYPING, StartTypingListener);
      socket.off(STOP_TYPING, stopTypingListener);
    };
  }, [chatId, StartTypingListener, stopTypingListener]);





  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        message: data.message, 
        sender: {
          _id: "alert",
          fullname: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setmessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: StartTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [REFETCH_CHATS]: RefetchListner,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);


  //same Message are confilicting so for unique messages we will use map data Structure
  // Logic
  // 1 . combine the old and new messages first using spread operator
  // 2. Then the combined array is passed to the map function where duplicate messages are removed - based on key and the key is ID of message and the value of the message itself
  // 3. The values appended with the final answer returns an iterator over the values of the map
  // 4. then using the spread opeartor we will convert the iterator to an array

  // Two Stpes are neccesary because
  // 1. At first it maps raw data and create an array of array consisting of key and value
  // 2. Now the Ground is ready by having a key value which is ID and the value is the message itself
  // 3. So now by using Map Constructor we can filter our same IDs effectively
  const allMessages = [
    ...new Map(
      [...oldmessages, ...messages].map((item) => [item._id, item])
    ).values(),
  ];

  // Sort the combined messages to ensure new messages are at the bottom
  allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // console.log("All messages " , allMessages);

  return isLoadingChat ? (
    <Loader />
  ) : (
    <Fragment>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        <Stack
          ref={containedRef}
          boxSizing={"border-box"}
          padding={"3rem"}
          spacing={"1rem"}
          flexGrow={1}
          bgcolor={"#E4F1FF"}
          sx={{
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {allMessages?.map((p) => (
            <MessageComponent
              key={p._id}
              message={p.message}
              attachments={p.Attachments}
              user={user}
              sender={p.sender}
            />
          ))}

          {userTyping && (
            <Box
              sx={{
                padding: "0.5rem",
                fontStyle: "italic",
                color: "#06D001",
                fontWeight: "bold",
              }}
            >
              Typing.....
              <div ref={bottomref} />
            </Box>
          )}
        </Stack>

        <form
          style={{
            flexShrink: 0,
            height: "auto",
          }}
          onSubmit={submitMessage}
        >
          <Stack
            direction={"row"}
            height={"100%"}
            padding={"1rem"}
            alignItems={"center"}
            position={"relative"}
          >
            <IconButton
              type="submit"
              sx={{
                backgroundColor: "#E90074",
                color: "#FFFFFF",
                marginLeft: "1rem",
                padding: "0.5rem",
                "&:hover": {
                  bgcolor: "#36BA98",
                },
              }}
              onClick={HandleFileOpen}
            >
              <AttachFile />
            </IconButton>

            <InputBox
              placeholder="Type your Emotions"
              value={message}
              onChange={messageOnChange}
            />

            <IconButton
              type="submit"
              sx={{
                backgroundColor: "#06D001",
                color: "#FFFFFF",
              }}
            >
              <Send />
            </IconButton>
          </Stack>
        </form>

        <Filemenu anchorE1={filemenuAnchor} />
      </Stack>
    </Fragment>
  );
};

export default AppLayout()(Chat);
