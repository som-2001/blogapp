import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { AdminNavbar } from "../../components/admin/AdminNavbar";
import { AdminResponsiveNavbar } from "../../components/admin/AdminResponsiveNavbar";
import { decodeIds } from "../../components/DecodeIds";
import { EncodeIds } from "../../components/EncodeIds";
import './adminread.css'

export const AdminRead = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const [blog, setBlog] = useState({});
  const [authorBlogs, setAuthorBlogs] = useState([]);

  const { encoded } = useParams();
  const decoded = decodeIds(encoded);
  console.log(decodeIds(encoded));

  // Fetch the current blog
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/singleBlog/${decoded[0]}`)
      .then((res) => {
        setBlog(res.data);

        // Fetch blogs by the same author
        axios
          .get(`${process.env.REACT_APP_BASEURL}/blogsByAuthor/${decoded[1]}`)
          .then((response) => {
            setAuthorBlogs(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle responsive adjustments
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
      {responsive > 738 ? <AdminNavbar /> : <AdminResponsiveNavbar />}
      <Grid container spacing={4} sx={{ padding: "50px 20px" }}>
        {/* Main Blog Content */}
        <Grid item xs={12} md={7} lg={7}>
          <Card className="card" >
            <CardMedia
              component="img"
              image={blog?.image_url}
              alt="Tools"
              sx={{ height: { xs: 200, sm: 400 }, objectFit: "cover" }}
            />
            <CardContent sx={{ backgroundColor: "#96c8f3" }}>
              <Typography variant="h6" gutterBottom>
                {blog?.card_title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {blog?.time}, {blog?.time_delay} read
              </Typography>
            </CardContent>
          </Card>

          <Box
            id='Box'
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                textAlign: "justify",
                width: {
                  xs: "70vw",
                  md: "49vw",
                },
              }}
               className='ql-editor'
            >
              <div dangerouslySetInnerHTML={{ __html: blog?.body }} />
            </Typography>
          </Box>
        </Grid>

        {/*Social links */}

        
        {/* Author Details Section */}
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          id='authorDetails'
        >
          {/* Author Card */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              padding: 2,
              boxShadow: 3,
              backgroundColor: "#96c8f3",
            }}
          >
            <Avatar
              alt="Author Name"
              src={blog?.user?.author_image}
              sx={{ width: 80, height: 80, marginRight: 2 }}
            />
            <Box
              id='authorDetails'
            >
              <Box>
                <Typography variant="h6" sx={{ marginTop: "10px" }}>
                  {blog?.user?.author_name}
                </Typography>
                <Typography variant="body1">
                  {blog?.user?.author_info}
                </Typography>
                <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
                <Typography variant="body2" color="text.secondary">
                  {blog?.user?.author_bio}
                </Typography>
              </Box>
            </Box>
          </Card>

          {/* Other Blogs by Author */}

          <Box
         
         sx={{
           marginTop: 4,
           width: "100%",
           
         }}
       >
         <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
           Other Blogs by {blog?.user?.author_name}
         </Typography>
         <Grid container spacing={2} >
           {authorBlogs.map((authorBlog) => (
             <Grid
               item
               xs={12}
               md={12}
               key={authorBlog._id}
               id='authorloop'
             >
               <Card
                 sx={{ boxShadow: 3, borderRadius: "10px", width: {xs:"300px",sm:"360px"} }}
               >
                 <CardMedia
                   component="img"
                   image={authorBlog?.image_url}
                   alt={authorBlog?.card_title}
                   sx={{ height: 180, objectFit: "cover" }}
                 />
                 <CardContent>
                   <Typography
                     variant="h6"
                     id='text'
                    
                   >
                     {authorBlog?.card_title}
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{
                       fontWeight: 100,
                       textAlign: "center",
                     }}
                    
                   >
                     <div
                       dangerouslySetInnerHTML={{
                         __html: authorBlog?.body.slice(0, 200),
                       }}
                     />
                     ...
                   </Typography>
                   <Button
                     size="small"
                     onClick={() =>
                       (window.location.href = `/admin-read-blog/${EncodeIds(authorBlog._id, authorBlog.user._id)}`)
                     }
                     sx={{ marginTop: 2 }}
                   >
                     Read More
                   </Button>
                 </CardContent>
               </Card>
             </Grid>
           ))}
         </Grid>
       </Box>
       
        </Grid>
      </Grid>
    </Box>
  );
};
