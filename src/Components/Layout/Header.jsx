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

// LAZY IMPORTS FOR DIALOGS
const Search = lazy(() => import("../Specific/Search"));
const Notification = lazy(() => import("../Specific/Notification"));
const NewGroup = lazy(() => import("../Specific/NewGroup"));

// NOTE - From header only you can open search dialog , menubar but you can disable them from their component only

const Header = () => {
 
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification , isNewGroup  } = useSelector((state) => state.misc);

  // OPEN DIALOGS
  const handlemobile = () => dispatch(setIsMobile(true));

  const openSearchDialog = () => dispatch(setIsSearch(true));

  const openNotification = () => dispatch(setIsNotification(true));

  const openNewgroup = () =>dispatch(setIsNewGroup(true));

  // NAVIGATE
  const NavigateToGroup = () => Navigate("/Groups");

  // LOGOUT HANDLER
  const logoutHandle = () => {
    console.log("Logout");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#030637",
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

            <IconButton color="inherit" onClick={openNotification}>
              <NotificationAddIcon />
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

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
    </>
  );
};

export default Header;
