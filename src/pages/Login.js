import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EncodeMyId } from "../components/EncodeIds";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("email is required"),
  password: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("password is required"),
});

export const Login = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      if (sessionStorage.getItem("role") === "user")
        navigate(`/my-blog/${EncodeMyId(sessionStorage.getItem("id"))}`);
      else navigate(`/admin-home`);
    }
  }, []);

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/login`, data)
      .then((res) => {
        toast.success(res.data.message);
        sessionStorage.setItem("id", res.data.id);
        reset();
        toast.success("login successful!!!");
        console.log(res.data);
        if (res.data.role === "user")
          navigate(`/my-blog/${EncodeMyId(res.data.id)}`);
        else navigate(`/admin-home`);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.error(error);
      });
  };

  const handleSuccess = (response) => {
    console.log("Login Success:", jwtDecode(response.credential));

    axios
      .post(`${process.env.REACT_APP_BASEURL}/google-login`, {
        email: jwtDecode(response.credential).email,
      })
      .then((res) => {
        toast.success(res.data.message);
        sessionStorage.setItem("id", res.data.id);
        sessionStorage.setItem("role", res.data.role);
        reset();
        toast.success("login successful!!!");
        console.log(res.data);
        if (res.data.role === "user")
          navigate(`/my-blog/${EncodeMyId(res.data.id)}`);
        else navigate(`/admin-home`);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.error(error);
      });
  };

  const handleFailure = (error) => {
    console.log("Login Failed:", error);
  };

  useEffect(() => {
    const ResizeFunc = () => {
      setResponsive(window.innerWidth);
    };
    window.addEventListener("resize", ResizeFunc);

    return () => {
      window.removeEventListener("resize", ResizeFunc);
    };
  }, []);
  return (
    <Box>
      <ToastContainer />
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <Grid container className="parent">
        <Grid item xs={12} lg={12} id="loginChild">
          <img
            src="../images/logo.png"
            alt=""
            style={{ width: "250px", marginTop: "40px" }}
          />
          <h1>
            <span style={{ marginLeft: "25px" }}>"Empower Minds,</span>
            <br />
            Share Your Voice"
          </h1>
          <p style={{ padding: "10px", marginTop: "1px" }}>
            Share your insights and inspire others—contribute to our blog
            community and empower minds!
          </p>
        </Grid>
        <Grid item xs={12} lg={12} id="loginChild">
          <form>
            <Grid
              container
              spacing={3}
              sx={{
                marginTop: "1%",
              }}
              id="loginChild"
            >
              <Grid item xs={12} md={12}>
                <FormControl sx={{ width: { xs: "300px", md: "400px" } }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        placeholder="john@mail.com"
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HowToRegIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
                <FormControl sx={{ width: { xs: "300px", md: "400px" } }}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        type={hide ? "password" : "text"}
                        placeholder="Give your password"
                        error={Boolean(errors?.password)}
                        helperText={errors?.password?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              {hide ? (
                                <VisibilityOffIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => setHide(!hide)}
                                />
                              ) : (
                                <VisibilityIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => setHide(!hide)}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ marginTop: "9px" }}>
                <Button
                  variant="contained"
                  id="loginBtn"
                  onClick={handleSubmit(onSubmit)}
                >
                  Proceed <HowToRegIcon sx={{ marginLeft: "10px" }} />
                </Button>
              </Grid>
            </Grid>
          </form>

          <p>
            New user? register{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={(e) => navigate("/register")}
            >
              here
            </span>
          </p>

          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            Or Login with
          </Typography>
          <Box sx={{ width: "277px" }}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};
