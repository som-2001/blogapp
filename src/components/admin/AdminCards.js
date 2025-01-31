import { Box, Grid, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { EncodeIds } from "../../components/EncodeIds";
import "./AdminCards.css";

export const AdminCards = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <Box>
      {blogs.length > 0 ? (
        blogs.map((data, index) => (
          <Grid container spacing={2} key={index}>
            {/* Text Content */}
            <Grid item xs={12} md={8}>
              <Typography color="primary" variant="body1">
                {data.time}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {data.card_title}
              </Typography>
              <Typography variant="body2">
                <div
                  dangerouslySetInnerHTML={{ __html: data?.body.slice(0, 200) }}
                />
                ...
              </Typography>
              <Box className="child">
                <Stack direction="row" spacing={1}>
                  <Chip label={data.topic} variant="outlined" />
                </Stack>
                <Typography variant="body2">
                  By {data.user.author_name}
                </Typography>
                <img src={data?.user?.author_image} alt="" className="img" />
                <Typography variant="body2">{data.time_delay}</Typography>
              </Box>
              <Typography
                align="center"
                onClick={(e) =>
                  navigate(
                    `/admin-read-blog/${EncodeIds(data._id, data.user._id)}`
                  )
                }
                sx={{ textDecoration: "underline", ml: 1 }}
              >
                Visit Post
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={4} className="grid1">
              <img src={data.image_url} alt={data.topic} className="img1" />
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ marginTop: "20%" }}>
          No recent posts are available.
        </Typography>
      )}
    </Box>
  );
};
