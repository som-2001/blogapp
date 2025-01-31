import { Box, CardMedia, Chip, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ResponsiveNavbar } from "../components/ResponsiveNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { EncodeIds } from "../components/EncodeIds";
import { Dateformater } from "../components/Dateformater";
import styles from "./TopicBlogs.module.css";

export const TopicBlogs = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

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
      .get(`${process.env.REACT_APP_BASEURL}/topic-blogs/${name}`)
      .then((res) => {
        setResult(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);
  return (
    <Box>
      {responsive > 738 ? <Navbar /> : <ResponsiveNavbar />}
      <ToastContainer />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ my: 2, color: "blueviolet" }}
          >
            {name} BLOGS
          </Typography>
          <Typography variant="h4" align="center" sx={{ fontSize: "2.0rem" }}>
            Find our all{" "}
            <span style={{ color: "blueviolet" }}>{name} Blogs</span> from here
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ my: 2, wordBreak: "break-word", width: "70vw" }}
          >
            our blogs are written from very research and well known writers so
            that we can provide you the best blogs and articles for you to read
            them all along.
          </Typography>
        </Box>
        <Grid container spacing={3} className={styles.parent}>
          {result.length > 0 &&
            result.map((data, index) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                className={styles.child}
                key={index}
              >
                <Box
                  sx={{
                    boxShadow: 2,
                    width: { xs: "294px", sm: "390px" },
                  }}
                  className={styles.image_url}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width:{
                      xs:"290px",
                      sm:"390px"
                    }}}
                    src={data.image_url}
                    alt=""
                    className={styles.img}
                  />

                  <Box className={styles.author}>
                    <img
                      src={data?.user?.author_image}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit:'cover'
                      }}
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
                      fontWeight: "600",
                      width:{
                        xs:"290px",
                        sm:"390px"
                      },
                      maxHeight:"48px",
                      minHeight:"47px",
                      lineBreak: "break-word",
                      marginLeft: "10px",
                    }}
                  >
                    {data.card_title}
                  </Typography>
                  <Typography variant="body2" className={styles.body} sx={{
                    width:{
                      xs:"290px",
                      sm:"390px"
                    }
                  }}>
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
                    View Post...
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
