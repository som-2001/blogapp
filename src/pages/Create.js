import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PublishIcon from "@mui/icons-material/Publish";
import "./Create.css";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, false] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const handleSubmit = () => {
    const formData = {
      title,
      date,
      topic,
      id: new Date(),
      url,
      content: editorContent,
      user: sessionStorage.getItem("id"),
    };
    if (!title || !date || !topic || !url || !editorContent) {
      toast.error("Fill up all the fields!!!");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/createBlog`, formData)
      .then((res) => {
        toast.success("Content has been published successfully!");
        navigate("/");
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
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box sx={{ padding: "20px" }}>
      <ToastContainer />
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <Box sx={{ paddingTop: "40px" }}>
        <Typography variant="h6" align="center" sx={{ marginBottom: "40px" }}>
          Write your thoughts here...
        </Typography>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Image Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Grid>
          {/* Date */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          {/* Topic */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Grid>

          {/* Rich Text Editor */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Content
            </Typography>

            <ReactQuill
              theme="snow"
              modules={quillModules}
              onChange={setEditorContent}
              placeholder="Write your content here..."
              style={{ height: "300px" }}
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12} className="grid">
            <Button
              variant="contained"
              color="primary"
              id="btn"
              onClick={handleSubmit}
            >
              <PublishIcon /> Publish
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
