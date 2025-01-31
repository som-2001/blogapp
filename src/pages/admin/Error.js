import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3rem", md: "6rem" },
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h6"
        sx={{
          margin: "10px 0",
          fontSize: { xs: "1rem", md: "1.5rem" },
          color: "#666",
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        sx={{ padding: "10px 20px",borderRadius:"30px" }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Box>
  );
};


