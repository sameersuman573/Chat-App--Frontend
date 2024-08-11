import React, { useState , useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
 import { createTheme, ThemeProvider } from "@mui/material/styles";
import { VisuallyHiddenInput } from "../Components/BasicStyle.Components";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../Redux/Thunks/admin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#021526",
    },
  }, 
});

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdmin } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const handleLoginamin = (e) => {
    e.preventDefault();
    console.log("Admin Login");
    dispatch(adminLogin(password));
  };

  useEffect(() => {
    dispatch(getAdmin);
  }, [dispatch]);

  if (isAdmin) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Example validation logic for strong password
    const error =
      value.length < 8 ? "Password must be at least 8 characters" : "";
    setPasswordError(error);
  };


  const UserLogin = () => {
    navigate("/login");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={20}
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          (
          <>
            <Typography variant="h4" fontWeight="bold">
              Admin
            </Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleLoginamin}
            >
              <TextField
                required
                color="primary"
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />

              {passwordError && (
                <Typography color="error" variant="caption">
                  {passwordError}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "1rem" }}
              >
                Login
              </Button>

              <Button
                type="submit"
                 color="primary"
                fullWidth
                sx={{ marginTop: "1rem" }}
                onClick={UserLogin}
              >
                User Login
              </Button>
            </form>
          </>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AdminLogin;
