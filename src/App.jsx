import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import Loader from "./Components/Layout/Loaders";
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Chat = lazy(() => import("./Pages/Chat"));
const Groups = lazy(() => import("./Pages/Group"));
const NotFound = lazy(() => import("./Pages/NotFound"));
import axios from "axios";
 import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { userExists, userNotExists } from "./Redux/Reducer/auth";
import { SocketProvider } from "./Socket";
import { Server } from "./Constants/Config";


// Transaction
import { SendMoney } from "./Pages/SendMoney";
import {TransactionHistory} from "./Pages/TranscationHistory"
import { DashBoard } from "./Pages/DashBoard";


// Admin
const AdminLogin = lazy(() => import("./Admin/AdminLogin"));
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const MessageManagament = lazy(() => import("./Admin/MessageManagament"));
const ChatManagment = lazy(() => import("./Admin/ChatManagment"));
const UserManagament = lazy(() => import("./Admin/UserManagement"));

axios.defaults.withCredentials = true; // Ensure cookies are included in requests

const App = () => {
  // Grrabing the user
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    try {
      console.log("Fetching current user...");

      const config = {
        withCredentials: true, // Ensure cookies are included
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `${Server}/api/v1/users/Currentuser`,
        config
      );

      // console.log("Full API response:", response);
      // console.log("Response data:", response.data);
      // console.log("Response data Success:", response.data.Success);
      // console.log("Response data user:", response.data.data);

      if (response.data && response.data.Success && response.data.data) {
        console.log("User exists:", response.data.data);
        dispatch(userExists({ user: response.data.data }));
      } else {
        console.log("No user found or unexpected response structure");
        dispatch(userNotExists());
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      dispatch(userNotExists());
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [dispatch]);

  return loader ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/home">
                <Login />
              </ProtectedRoute>
            } 
          />
          {/* This thing is done so that You Cannot ReturnBack to Login */}

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user" element={<UserManagament />} />
          <Route path="/admin/message" element={<MessageManagament />} />
          <Route path="/admin/chat" element={<ChatManagment />} />


          <Route path="/Dashboard" element={<DashBoard />} />   // works 
          <Route path="/send" element={<SendMoney />} />
          <Route
            path="/history/:Fromusername"
            element={<TransactionHistory />}
          />

          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-top" />
    </BrowserRouter>
  );
};

export default App;
 