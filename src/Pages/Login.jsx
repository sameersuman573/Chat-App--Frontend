import React, { useState } from "react";
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
import { CameraAlt } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { VisuallyHiddenInput } from "../Components/BasicStyle.Components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userExists } from "../Redux/Reducer/auth";
import { useNavigate } from "react-router-dom";
import { Server } from "../Constants/Config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#021526",
    },
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [File, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const AdminLogin = () => {
    navigate("/admin");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${Server}/api/v1/users/login`,
        { email, password },
        config
      );

      const { user } = response.data.data;

      dispatch(userExists(response.data.data));
      // console.log("res1", response.data.user);
      // console.log("res2", response.data.data);

      toast.success("Login Successful", response.data.message);
      navigate("/home");
    } catch (error) {
      console.error(
        "Invalid Credentials:",
        error.response || error.message || error
      );
      toast.error(
        error?.response?.data?.message ||
          "Invalid Credentials, Please try again"
      );
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    // Add your signup logic here
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", File);
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
   
      const response = await axios.post(
        `${Server}/api/v1/users/register`,
        formData,
        config
      );

      console.log('response:', response); // Log the response

     
    if (response.status === 201) {
      toast.success("Signup Successful", { autoClose: 3000 });
      navigate("/admin/dashboard");
    } else {
      throw new Error('Unexpected response status');
    }

    } catch (error) {
      console.error(
        "Problem in Registering",
        error.response || error.message || error
      );
      toast.error(error?.response?.data?.message || "Problem in Registering");
    }
  };
  

  const handleFilechange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result); // Set the result as the image source
      };
      reader.readAsDataURL(selectedFile); // Convert file to data URL
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    // Example validation logic
    const error =
      value.length < 3 ? "Username must be at least 3 characters" : "";
    setUsernameError(error);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Example validation logic for strong password
    const error =
      value.length < 1 ? "Password must be at least 1 characters" : "";
    setPasswordError(error);
  };

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
          {isLogin ? (
            <>
              <Typography variant="h4" fontWeight="bold">
                Login
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  color="primary"
                  label="Email"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* {usernameError && (
                  <Typography color="error" variant="caption">
                    {usernameError}
                  </Typography>
                )} */}

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

                {/* {passwordError && (
                  <Typography color="error" variant="caption">
                    {passwordError}
                  </Typography>
                )} */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Login
                </Button>
                <Typography textAlign="center" m="1rem">
                  Or
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  SignUp
                </Button>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  onClick={AdminLogin}
                >
                  Admin Login
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4">SignUp</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignup}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    src={filePreview}
                    // Display the uploaded image if available
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      backgroundColor: "primary.main",
                      color: "white",
                      fontSize: "5rem",
                    }}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "white",
                      color: "primary.main",
                      padding: "0.5rem",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    component="label"
                  >
                    <>
                      <CameraAlt />
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleFilechange}
                      />
                    </>
                  </IconButton>
                </Stack>

                <TextField
                  required
                  label="FullName"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  required
                  label="Username"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                />

                {/* {usernameError && (
                  <Typography color="error" variant="caption">
                    {usernameError}
                  </Typography>
                )} */}

                <TextField
                  required
                  label="Email"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />

                {/* {passwordError && (
                  <Typography color="error" variant="caption">
                    {passwordError}
                  </Typography>
                )} */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  SignUp
                </Button>
                <Typography textAlign="center" m="1rem">
                  Or
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
