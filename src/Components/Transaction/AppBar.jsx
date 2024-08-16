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
  AttachMoney,
  AttachMoneyTwoTone,
  Menu as MenuIcon,
  MoneyOffOutlined,
  MoneyOutlined,
  MovieCreationSharp,
  Payment,
  PaymentOutlined,
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
import TransactionSearch from "../Specific/TransactionSearch";

// LAZY IMPORTS FOR DIALOGS
const Search = lazy(() => import("../Specific/Search"));
const Notification = lazy(() => import("../Specific/Notification"));
const NewGroup = lazy(() => import("../Specific/NewGroup"));

// NOTE - From header only you can open search dialog , menubar but you can disable them from their component only

const Header = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );



  // --------------------------------------------------------
  const {user} = useSelector((state) => state.auth)
  console.log("User in header", user);
  // --------------------------------------------------------




  // OPEN DIALOGS
  const handlemobile = () => dispatch(setIsMobile(true));

  const openSearchDialog = () => dispatch(setIsSearch(true));

 
 
  // NAVIGATE
  const openHome = () => Navigate("/home");




  // --------------------------------------------------------
  const NavigateToTransactionHistory = () => {
    if(user){
      Navigate(`/history/${user.username}`);
    }
  }
  // --------------------------------------------------------





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

            <IconButton color="inherit" onClick={openHome}>
              <MovieCreationSharp />
            </IconButton>

            <IconButton color="inherit" onClick={openSearchDialog}>
              <Payment />
            </IconButton>

            

            <IconButton color="inherit" onClick={NavigateToTransactionHistory}>
              <AttachMoney />
            </IconButton>

            <IconButton color="inherit" onClick={logoutHandle}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <TransactionSearch />
        </Suspense>
      )}

 

       
    </>
  );
};

export default Header;
