import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
} from "@mui/material";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { decodeMyId } from "../components/DecodeIds";
import { EncodeMyId } from "../components/EncodeIds";

const schema = yup.object().shape({
  title: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("title is required"),
  date: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("date is required"),
  topic: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("topic is required"),
  editorContent: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .required("editorContent is required"),
  url: yup
    .string()
    .test(
      "no-only-spaces",
      "Empty spaces are not allowed.",
      (value) => value && value.trim() !== ""
    )
    .url("Invalid Url")
    .required("url is required"),
});

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, false] }],
    ["link", "image"],
    ["clean"],
  ],
};
export const Edit = () => {
  const navigate = useNavigate();

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/editBlog/${decodeMyId(window.location.href.split("/edit-blog/")[1])}`,
        data
      )
      .then((res) => {
        toast.success("Updated Blog published successfully!!!");
        reset();
        navigate(`/my-blog/${EncodeMyId(sessionStorage.getItem("id"))}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/singleBlog/${decodeMyId(window.location.href.split("/edit-blog/")[1])}`
      )
      .then((res) => {
        console.log(res.data);
        setValue("title", res.data?.card_title);
        setValue("date", res.data?.time);
        setValue("topic", res.data?.topic);
        setValue("url", res.data?.image_url);
        setValue("editorContent", res.data?.body);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.error(error);
      });
  }, [setValue]);

  return (
    <Box sx={{ padding: "20px" }}>
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <ToastContainer />
      <Box sx={{ padding: "40px" }}>
        <Typography variant="h6" align="center" sx={{ marginBottom: "40px" }}>
          Write your thoughts here...
        </Typography>
        <form>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      focused
                      label="Title"
                      error={Boolean(errors?.title)}
                      helperText={errors?.title?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      focused
                      label="Image Url"
                      error={Boolean(errors?.url)}
                      helperText={errors?.url?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* Date */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      focused
                      label="Date"
                      error={Boolean(errors?.date)}
                      helperText={errors?.date?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* Topic */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="topic"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Topic"
                      focused
                      error={Boolean(errors?.topic)}
                      helperText={errors?.topic?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Rich Text Editor */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Content
              </Typography>

              <FormControl fullWidth>
                <Controller
                  name="editorContent"
                  control={control}
                  render={({ field }) => (
                    <>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Write your content here..."
                        {...field}
                        style={{ height: "300px" }}
                      />
                    </>
                  )}
                />
                {errors.editorContent && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errors?.editorContent?.message}
                  </p>
                )}
              </FormControl>
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12} sx={{ marginTop: "29px" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "20px" }}
                onClick={handleSubmit(onSubmit)}
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
