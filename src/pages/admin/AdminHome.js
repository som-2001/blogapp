import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { AdminNavbar } from "../../components/admin/AdminNavbar";
import { AdminResponsiveNavbar } from "../../components/admin/AdminResponsiveNavbar";
import axios from "axios";
import BookIcon from '@mui/icons-material/Book';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CategoryIcon from '@mui/icons-material/Category';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AdminCards } from "../../components/admin/AdminCards";
import './AdminHome.css';


export const AdminHome = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const [blogs, setBlogs] = useState([]);
  const [dashboardData,setDashboardData]=useState({
    totalBlogs:0,
    totalUsers:0,
    totalCategories:0,
    pendingReviews:2,
    activeAdmins:0
  })

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
      .get(`${process.env.REACT_APP_BASEURL}/latestBlog`)
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`${process.env.REACT_APP_BASEURL}/admin-dashboard`)
      .then((res) => {
        console.log(res.data);
        setDashboardData({
          totalBlogs:res.data.totalBlogs,
          totalUsers:res.data.totalUsers,
          totalCategories:res.data.totalCategories,
          pendingReviews:res.data.totalPendingReviews,
          activeAdmins:res.data.activeAdmins
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <Box id='parentDiv'>
      {responsive > 738 ? <AdminNavbar /> : <AdminResponsiveNavbar />}
      <Typography
        variant="h5"
        align="center"
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Blogs */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} id="card">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} className="grid" >
                <BookIcon sx={{fontSize:"4.5rem"}}/>
                </Grid>
                <Grid item xs={6}>
                <Typography variant="h6">Total Blogs</Typography>
              <Typography variant="h3" color="primary">
                {dashboardData.totalBlogs}
              </Typography>
                </Grid>
             
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} id="card">
            <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={6} className="grid">
                <PeopleOutlineIcon sx={{fontSize:"4.5rem"}}/>
                </Grid>
                <Grid item xs={6}>
                <Typography variant="h6">Total Users</Typography>
              <Typography variant="h3" color="primary">
                {dashboardData.totalUsers-dashboardData.activeAdmins}
              </Typography>
                </Grid>
             
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Categories */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} id="card">
            <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={6} className="grid">
                <CategoryIcon sx={{fontSize:"4.5rem"}}/>
                </Grid>
                <Grid item xs={6}>
                <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h3" color="primary">
                {dashboardData.totalCategories}
              </Typography>
                </Grid>
             
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Reviews */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} id="card">
            <CardContent>
             <Grid container spacing={2}>
                <Grid item xs={6} className="grid">
                <RateReviewIcon sx={{fontSize:"4.5rem"}}/>
                </Grid>
                <Grid item xs={6}>
                <Typography variant="h6">Total Pending Reviews</Typography>
              <Typography variant="h3" color="primary">
                {dashboardData.pendingReviews}
              </Typography>
                </Grid>
             
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Admins */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} id="card">
            <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={6} className="grid">
                <AdminPanelSettingsIcon sx={{fontSize:"4.5rem"}}/>
                </Grid>
                <Grid item xs={6}>
                <Typography variant="h6">Total Active Admins</Typography>
              <Typography variant="h3" color="primary">
                {dashboardData.activeAdmins}
              </Typography>
                </Grid>
             
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      
      <Grid
        container
        spacing={2}
        className="containerGrid"
        
      >
        <Typography variant="h6" sx={{marginTop:{xs:"15%",sm:"5%"}}}>Recent Posts</Typography>
        <Grid item xs={12} sm={12} md={12} className="containerGrid">
          <AdminCards blogs={blogs} />
        </Grid>
      </Grid>
    </Box>
  );
};
