import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import { ToastContainer } from "react-toastify";
import { EncodeIds, EncodeMyId } from "../components/EncodeIds";
import { decodeIds } from "../components/DecodeIds";
import PublishIcon from "@mui/icons-material/Publish";
import { Dateformater } from "../components/Dateformater";
import styles from "./Myblog.module.css";

export const Myblog = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);

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
        `${process.env.REACT_APP_BASEURL}/myBlog/${decodeIds(
          window.location.href.split("/my-blog/")[1]
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <ToastContainer />
      <Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ my: 2, color: "blueviolet" }}
        >
          Your BLOGS
        </Typography>
        <Typography variant="h4" align="center" sx={{ width: "98vw" }}>
          Find your all <span style={{ color: "blueviolet" }}>Blogs</span> from
          here
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={styles.body3}
          sx={{
            my: 2,
          }}
        >
          our <span style={{ color: "blueviolet" }}>Blogs</span> are written
          from very research and well known writers so that we can provide you
          the best <span style={{ color: "blueviolet" }}>Blogs</span> and
          articles for you to read them all along.
        </Typography>

        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2} className={styles.parent}>
            {blogs.length > 0 ? (
              blogs.map((data, index) => (
                <Grid item xs={12} md={6} lg={4} className={styles.grid}>
                  <Box
                    sx={{
                      boxShadow: 2,
                      padding: 2,
                      borderRadius: 3,
                      width: { xs: "294px", sm: "390px" },
                    }}
                    className={styles.grid}
                  >
                    <Box sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        src={data.image_url}
                        alt=""
                        sx={{
                          width: {
                            xs: "290px",
                            sm: "390px",
                          },
                        }}
                        className={styles.img}
                      />

                      <MenuItems
                        id={EncodeMyId(data._id)}
                        setBlogs={setBlogs}
                      />
                    </Box>
                    <Box className={styles.MyBlogParent}>
                      <img
                        src={data?.user?.author_image}
                        alt=""
                        className={styles.img1}
                      />
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
                      sx={{
                        fontWeight: 600,
                        width: {
                          xs: "290px",
                          sm: "390px",
                        },
                        maxHeight: "48px",
                        minHeight: "47px",
                      }}
                      className={styles.body1}
                    >
                      {data.card_title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "400",
                        width: {
                          xs: "290px",
                          sm: "390px",
                        },
                      }}
                      className={styles.body1}
                    >
                      {data.status}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ my: 1 }}
                      className={styles.mainBody}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.body.slice(0, 200),
                        }}
                      />
                      ...
                    </Typography>
                    <Typography
                      className={styles.navigate}
                      onClick={(e) =>
                        navigate(
                          `/read-blog/${EncodeIds(data._id, data.user._id)}`
                        )
                      }
                    >
                      View Post
                    </Typography>
                  </Box>
                </Grid>
              ))
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ wordBreak: "break-word", padding: "20px" }}
                >
                  You haven't published any blogs currently
                </Typography>
                <center>
                  <Button
                    variant="contained"
                    className={styles.btn}
                    onClick={(e) => navigate("/create")}
                  >
                    Publish new blog <PublishIcon />
                  </Button>
                </center>
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
