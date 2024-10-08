import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Server } from "../../Constants/Config";

// prefix String = admin/login
const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${Server}/api/v1/Admin/LoginAdmin`,
      { secretKey },
      config
    );

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {
    const { data } = await axios.get(
      `${Server}/api/v1/Admin/GetAdmin`,
      {
        withCredentials: true,
      }
    );

    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

const AdminLogout = createAsyncThunk("admin/Logout", async () => {
  try {
    const { data } = await axios.post(
      `${Server}/api/v1/Admin/LogoutAdmin`,
      {
        withCredentials:true
      }
    );

  } catch (error) {
    throw error.response.data.message;
  }
});

export { adminLogin, getAdmin , AdminLogout};
