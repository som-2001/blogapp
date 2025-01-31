import { Box, Typography } from "@mui/material";
import "./Footer.css";

export const Footer = () => {
  return (
    <Box id="parent">
      <Box id="child">
        <Typography variant="body1">Blog App</Typography>
        <Typography variant="body2" id="lastChlid">
          &copy; 2024 All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};
