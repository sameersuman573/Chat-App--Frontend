import {
  ChatBubbleOutlineRounded,
  Close,
  ExitToApp,
  Logout,
  Menu,
  MessageRounded,
  Shield,
  VerifiedUserRounded,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Link } from "../BasicStyle.Components";
import { useDispatch , useSelector } from "react-redux";
import { AdminLogout } from "../../Redux/Thunks/admin";
 
const AdminTabs = [
  {
    name: "dashboard",
    path: "/admin/dashboard",
    icon: <Shield />,
  },
  {
    name: "Users",
    path: "/admin/user",
    icon: <VerifiedUserRounded />,
  },

  {
    name: "Message",
    path: "/admin/message",
    icon: <MessageRounded />,
  },
  {
    name: "chat",
    path: "/admin/chat",
    icon: <ChatBubbleOutlineRounded />,
  },
  // {
  //   name: "Logout",
  //   path: "/admin",
  //   icon: <Logout />,
  // },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = () => {
    dispatch(AdminLogout());
    navigate("/login");
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography>Electron</Typography>

      <Stack spacing={"1rem"}>
        {AdminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                // location.pathname contains the current URL path.
                // tab.path is the path associated with the tab.
                bgcolor: "#0B666A",
                color: "03AED2",
                ":hover": {
                  color: "#FF55BB",
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"2rem"}>
              {tab.icon}
              <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToApp />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

 const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [isMobile, setisMobile] = useState(false);

  const handlemobile = () => setisMobile(!isMobile);

  const handleclose = () => setisMobile(false);

  if (!isAdmin) return <Navigate to={"/admin"} />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          bgcolor: "#39B5E0",
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handlemobile}>
          {isMobile ? <Close /> : <Menu />}
        </IconButton>
      </Box>

      {/* Sidebar */}
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          bgcolor: "#FFFFFF",
        }}
      >
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          display: { xs: "block" },
          bgcolor: "#FFFFFF",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClick={handleclose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
