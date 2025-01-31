import { Box, CardMedia, Chip, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EncodeIds } from "../components/EncodeIds";
import { Dateformater } from "../components/Dateformater";
import "./Blog.css";

export const Blog = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/allBlogs`)
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ my: 2, color: "blueviolet" }}
        >
          OUR BLOGS
        </Typography>
        <Typography variant="h4" align="center">
          Find our all <span style={{ color: "blueviolet" }}>Blogs</span> from
          here
        </Typography>
        <Typography variant="body1" align="center" sx={{ my: 2 }} id="body1">
          our <span style={{ color: "blueviolet" }}>Blogs</span> are written
          from very research and well known writers so that we can provide you
          the best <span style={{ color: "blueviolet" }}>Blogs</span> and
          articles for you to read them all along.
        </Typography>

        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2} className="parent">
            {blogs.length > 0 ? (
              blogs.map((data, index) => (
                <Grid item xs={12} md={6} lg={4} className="child1" key={index}>
                  {data?.status !== "pending" && (
                    <Box
                      id="child2"
                      sx={{
                        boxShadow: 2,
                        width: { xs: "294px", sm: "390px" },
                        padding: 2,
                        borderRadius: 3,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: {
                            xs: "290px",
                            sm: "390px",
                          },
                        }}
                        src={data.image_url}
                        alt=""
                        id="imginBlog"
                      />
                      <Box sx={{ my: 2 }} className="child3">
                        <img src={data?.user?.author_image} alt="" id="dp" />
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={data.topic}
                            variant="outlined"
                            sx={{ backgroundColor: "whitesmoke" }}
                          />
                        </Stack>
                        <Typography variant="body2">
                          {Dateformater(data.time)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{width: { xs: "290px",sm: "390px"}}}
                        id="Blog_card_title"
                      >
                        {data.card_title}
                      </Typography>
                      <Typography
                        variant="body2"
                        id="text1ForBlog"
                        sx={{fontWeight: "400",width: {xs: "290px",sm: "390px"}}}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.body.slice(0, 200),
                          }}
                        />
                        ...
                      </Typography>
                      <Typography
                        id="text"
                        onClick={(e) =>
                          navigate(
                            `/read-blog/${EncodeIds(data._id, data.user._id)}`
                          )
                        }
                      >
                        View Post
                      </Typography>
                    </Box>
                  )}
                </Grid>
              ))
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  id="noBlog"
                >
                  There are no blogs available.
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
