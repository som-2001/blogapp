import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { AdminResponsiveNavbar } from "../../components/admin/AdminResponsiveNavbar";
import { AdminNavbar } from "../../components/admin/AdminNavbar";
import axios from "axios";
import Blogtable from "../../components/admin/Blogtable";
import { ToastContainer } from "react-toastify";
import './userBlogs.css'

export const UserBlogs=()=>{
    const [responsive, setResponsive] = useState(window.innerWidth);
    const [blogs,setBlogs]=useState([]);

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
          .get(`${process.env.REACT_APP_BASEURL}/allBlogsforadmin`)
          .then((res) => {
            console.log(res.data);
            setBlogs(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    
    return(
        <Box >
          <ToastContainer/>
            {responsive > 738 ? <AdminNavbar /> : <AdminResponsiveNavbar />}
            <Box className='parent'>
            <Typography variant="h6" align="center" sx={{my:2}}>Blogs</Typography>
             <Blogtable blogs={blogs} setBlogs={setBlogs} />
             </Box>
        </Box>
    )
}