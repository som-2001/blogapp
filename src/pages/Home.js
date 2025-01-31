import { Box, Typography, Divider, Grid } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import "./Home.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { HomeCards } from "../components/HomeCards.js";
import { Footer } from "../components/Footer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const ResizeFunc = () => {
      setResponsive(window.innerWidth);
    };
    window.addEventListener("resize", ResizeFunc);

    return () => {
      window.removeEventListener("resize", ResizeFunc);
    };
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [blogTopics, setBlogTopics] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/latestBlog`)
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${process.env.REACT_APP_BASEURL}/trendingTopics/4`)
      .then((res) => {
        console.log(res.data);
        setTopics(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${process.env.REACT_APP_BASEURL}/trendingTopics/10`)
      .then((res) => {
        console.log(res.data);
        setBlogTopics(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{overflowX:"hidden"}}>
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <Box className="HomeBody">
        <Typography
          variant="h4"
          className="HomeH4"
          sx={{  mt: 2 }}
        >
          Insights from our team
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          align="center"
          sx={{ mt: 2}}
        >
          Advanced Blogging Tools and Features for Experienced Writers
        </Typography>
        <Divider sx={{ marginTop: "40px" }} />
        <Grid container spacing={2} sx={{ padding: { xs: 2, md: 4 } }}>
          {/* Blog Topics Sidebar */}
          {blogTopics?.length > 0 && (
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                marginTop: { xs: 0, md: "4%" },
                display: { xs: "none", md: "block" },
                cursor:"pointer"
              }}
            >
              <Typography variant="body1" color="primary">
                Blog Topics
              </Typography>
              {blogTopics.slice(0, 5).map((data, index) => (
                <Box key={index} sx={{ my: 2 }}>
                  <Typography
                    variant="body2"
                    onClick={() => navigate(`/topic-blogs/${data._id}`)}
                  >
                    {data._id}
                  </Typography>
                </Box>
              ))}

              {blogTopics.length > 5 && (
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ marginTop: "40px" }}
                >
                  Blog Topics
                </Typography>
              )}
              {blogTopics.slice(5, 10).map((data, index) => (
                <Box key={index} sx={{ my: 2 }}>
                  <Typography
                    variant="body2"
                    onClick={() => navigate(`/topic-blogs/${data._id}`)}
                  >
                    {data._id}
                  </Typography>
                </Box>
              ))}
            </Grid>
          )}

          {/* Trending Topics and Cards */}
          <Grid item xs={12} md={9}>
            {topics.length>0 && <Box>
              <Typography
                variant="body1"
                color="primary"
                sx={{ marginTop: "40px" }}
              >
                Trending Topics
              </Typography>
              <Stack
                direction={responsive > 632 ? "row" : "column"}
                spacing={1}
                sx={{ marginTop: "10px", marginBottom: "35px" }}
              >
                {topics?.map((data, index) => (
                  <Chip key={index} label={data._id} variant="outlined" />
                ))}
              </Stack>
            </Box>}
            <HomeCards blogs={blogs} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};
