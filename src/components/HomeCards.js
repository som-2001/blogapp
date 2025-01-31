import { Box, Grid, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { EncodeIds } from "./EncodeIds";
import "./HomeCards.css";
import { Dateformater } from "./Dateformater";

export const HomeCards = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <Box>
      {blogs.length > 0 ? (
        blogs.map((data, index) => (
          <Grid container spacing={2} key={index}>
            {/* Text Content */}

            <Grid item xs={12} lg={8} sx={{ marginTop: "15px" }}>
              <Typography color="primary" variant="body1">
                {Dateformater(data.time)}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, my: 2 }}>
                {data.card_title}
              </Typography>
              <Typography variant="body2">
                <div
                  dangerouslySetInnerHTML={{ __html: data?.body.slice(0, 200) }}
                />
                ...
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: "10px",
                  marginTop: "15px",
                  marginBottom: "15px",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <Chip label={data.topic} variant="outlined" />
                </Stack>
                <Typography variant="body2">
                  By {data.user.author_name}
                </Typography>
                <img
                  src={data?.user?.author_image}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography variant="body2" color="primary">
                  {data.time_delay}
                </Typography>
              </Box>
              <Typography
                align="center"
                style={{
                  textDecoration: "underline",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={(e) =>
                  navigate(`/read-blog/${EncodeIds(data._id, data.user._id)}`)
                }
              >
                View Post
              </Typography>
            </Grid>

            {/* Image */}
            <Grid
              item
              xs={12}
              lg={4}
              id='homeCardsChid'
            >
              <img
                src={data.image_url}
                alt={data.topic}
                id="homeCardsimg"
              />
            </Grid>
          </Grid>
        ))
      ) : (
        <Box
          className="noPostAvailable"
          sx={{ width: { xs: "80vw", sm: "89vw", md: "92vw" } }}
        >
          <Typography variant="h6">No recent posts are available.</Typography>
        </Box>
      )}
    </Box>
  );
};
