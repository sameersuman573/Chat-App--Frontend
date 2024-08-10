import { createSlice } from "@reduxjs/toolkit";
 import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../Constants/constants";
import { act } from "react";

const initialState = {
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {

    setNewMessagesAlert: (state, action) => {
      // Search through the newMessageAlert array and try to find the newmessage index with association to the chatId . 
      // if you donot got index it means someone has sent a new message else you are receiving the message from the same chat
      const chatId = action.payload.chatId
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );

      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        // New message has come so save it and start count from 1
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }


      // save updated changes to storage
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: state.newMessagesAlert
      })
    },

    // when you will go on a particular chat Then number of unseen messages count will become 0 as you have become updated

    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );

      // save updated state to storage
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: state.newMessagesAlert
      })
    },
  },
});

export const { setNewMessagesAlert, removeNewMessagesAlert } =
  chatSlice.actions;
  export default chatSlice
