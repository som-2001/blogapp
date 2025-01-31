import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import axios from "axios";
import { decodeMyId } from "../components/DecodeIds";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import { toast, ToastContainer } from "react-toastify";
import "./Profile.css";

const schema = yup.object().shape({
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
    .required("info is required"),
  email: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("name is required"),
  author_image: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .url("invalid url")
    .required("iamge is required"),
  author_bio: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("bio is required"),
});

export const Profile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");

  const [responsive, setResponsive] = useState(window.innerWidth);

  useEffect(() => {
    const ResizeFunc = () => {
      setResponsive(window.innerWidth);
    };
    window.addEventListener("resize", ResizeFunc);

    return () => {
      window.removeEventListener("resize", ResizeFunc);
    };
  }, []);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/getRole/${decodeMyId(window.location?.href?.split("/profile/")[1])}`
      )
      .then((res) => {
        setName(res.data.author_name);
        setImage(res.data.author_image);
        setEmail(res.data.email);
        setValue("author_name", res.data.author_name.trim());
        setValue("author_bio", res.data.author_bio.trim());
        setValue("author_image", res.data.author_image.trim());
        setValue("author_info", res.data.author_info.trim());
        setValue("email", res.data.email.trim());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/profileEdit`, {
        data,
        id: decodeMyId(window.location?.href?.split("/profile/")[1]),
      })
      .then((res) => {
        toast.success("Profile has been edited successfully!!!");

        setName(data.author_name.trim());
        setEmail(data.email.trim());
        setImage(data.author_image.trim());

        setValue("author_name", data.author_name.trim());
        setValue("author_bio", data.author_bio.trim());
        setValue("author_image", data.author_image.trim());
        setValue("author_info", data.author_info.trim());
        setValue("email", data.email.trim());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box>
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <ToastContainer />
      <Box id="profileParent">
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 4 },
            maxWidth: { xs: "300px", sm: "800px" },
            borderRadius: 2,
          }}
          id="profilePaper"
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={2} textAlign="center">
              <Avatar src={image} id="profileAvatar" />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="h5" fontWeight="bold">
                {name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {email}
              </Typography>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ marginTop: 3 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="author_name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Name"
                      fullWidth
                      focused
                      error={Boolean(errors?.author_name)}
                      helperText={errors?.author_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="author_info"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Info"
                      fullWidth
                      focused
                      error={Boolean(errors?.author_info)}
                      helperText={errors?.author_info?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Email"
                      fullWidth
                      focused
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="author_image"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Image"
                      fullWidth
                      focused
                      error={Boolean(errors?.author_image)}
                      helperText={errors?.author_image?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="author_bio"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Bio"
                      multiline
                      focused
                      rows={5}
                      fullWidth
                      error={Boolean(errors?.author_bio)}
                      helperText={errors?.author_bio?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  id="profileBtn"
                >
                  <EditAttributesIcon sx={{ fontSize: "1.9rem" }} /> Save
                  Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
