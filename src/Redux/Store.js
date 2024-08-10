import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/auth"; // Import the entire slice
import api from "./api/api";
import miscSlice from "./Reducer/misc";
import chatSlice from "./Reducer/chat";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    // Use the reducer property from the imported slice
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
