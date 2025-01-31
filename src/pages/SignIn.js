import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LinkIcon from "@mui/icons-material/Link";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./SignIn.module.css";

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
  author_name: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("name is required"),
  author_info: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("Info is required"),
  author_bio: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("bio is required"),
  author_image: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    ).url("Invalid Url")
    .required("image url is required"),
});

export const SignIn = () => {
  const [hide, setHide] = useState(true);
  const [responsive, setResponsive] = useState(window.innerWidth);
  const navigate = useNavigate();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/register`, data)
      .then((res) => {
        toast.success(res.data.message);
        sessionStorage.setItem("temporary_id", res.data.user._id);
        reset();
        toast.success("Registration successful!!!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.error(error);
      });
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
      <Grid container className={styles.parent}>
        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          
        >
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
        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            marginTop: "1%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <form>
            <Grid
              container
              spacing={3}
              
              sx={{
                marginTop: "1%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Title */}
              <Grid item xs={12} md={12}>
                <FormControl sx={{ width: { xs: "300px", md: "400px" } }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                        placeholder="john@mail.com"
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
                        type={hide ? "password" : "text"}
                        label="Password"
                        placeholder="Give your password..."
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
              <Grid item xs={12} md={12}>
                <FormControl sx={{ width: { xs: "300px", md: "400px" } }}>
                  <Controller
                    name="author_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Author Name"
                        error={Boolean(errors?.author_name)}
                        placeholder="John Doe"
                        helperText={errors?.author_name?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
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
                    name="author_info"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Author Info"
                        placeholder="Give your info..."
                        error={Boolean(errors?.author_info)}
                        helperText={errors?.author_info?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InfoIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              {/* Date */}
              <Grid item xs={12} md={12}>
                <FormControl sx={{ width: { xs: "300px", md: "400px" } }}>
                  <Controller
                    name="author_bio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label="Author Bio"
                        placeholder="Give your info..."
                        error={Boolean(errors?.author_bio)}
                        helperText={errors?.author_bio?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FingerprintIcon />
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
                    name="author_image"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        placeholder="https://mui.com/static/images/avatar/1.jpg"
                        label="Author Image"
                        error={Boolean(errors?.author_image)}
                        helperText={errors?.author_image?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LinkIcon />
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
                  sx={{
                    marginTop: "1px",
                    padding: "13px",
                    backgroundColor: "#4d88d3",
                    borderRadius: "29px",
                    width: "200px",
                  }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Proceed <HowToRegIcon sx={{ marginLeft: "10px" }} />
                </Button>
              </Grid>
            </Grid>
          </form>
          <p>
            Already Registered? login{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={(e) => navigate("/login")}
            >
              here
            </span>
          </p>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};
