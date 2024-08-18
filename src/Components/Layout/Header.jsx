import React, { Suspense, lazy, useState } from "react";
import {
  AppBar,
  Backdrop,
  Box,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Add,
  AttachMoneyRounded,
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../Redux/Reducer/misc";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Server } from "../../Constants/Config";

// LAZY IMPORTS FOR DIALOGS
const Search = lazy(() => import("../Specific/Search"));
const Notification = lazy(() => import("../Specific/Notification"));
const NewGroup = lazy(() => import("../Specific/NewGroup"));

// NOTE - From header only you can open search dialog , menubar but you can disable them from their component only

const Header = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification , isNewGroup  } = useSelector((state) => state.misc);

  // OPEN DIALOGS
  const handlemobile = () => dispatch(setIsMobile(true));

  const openSearchDialog = () => dispatch(setIsSearch(true));

  const openNotification = () => dispatch(setIsNotification(true));

  const openNewgroup = () =>dispatch(setIsNewGroup(true));

  // NAVIGATE
  const NavigateToGroup = () => navigate("/Groups");
  const NavigateToTransaction = () => navigate("/Dashboard");

 
const config = {
  withCredentials: true,
};

// LOGOUT HANDLER
const logoutHandle = async () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken'))
      .split('=')[1];

    if (!token) {
      console.error('No access token found in cookies');
      return;
    }

    const res = await axios.post(`${Server}/api/v1/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Include this to send cookies with the request
    });

    // Invalidate the cookies
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    dispatch(userNotExists());
    navigate('/login');
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong while logging out");
  }
};
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#000000",
            // background: "linear-gradient(45deg, #0f0c29, #302b63, #24243e)",
            // background: "linear-gradient(45deg, #141E30, #243B55 )",

          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              Ｅｌｅｃｔｒｏｎ
            </Typography>

            <Box
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handlemobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }}></Box>

            <IconButton color="inherit" onClick={
              openNewgroup}>
              <Add />
            </IconButton>

            <IconButton color="inherit" onClick={openSearchDialog}>
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit" onClick={NavigateToGroup}>
              <GroupAddIcon />
            </IconButton>

            <IconButton color="inherit" onClick={NavigateToTransaction}>
              <AttachMoneyRounded />
            </IconButton>

            <IconButton color="inherit" onClick={logoutHandle}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}

      {/* {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )} */}
    </>
  );
};

export default Header;
