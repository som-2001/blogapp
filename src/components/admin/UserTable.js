import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  styled,
  TableHead,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './UserTable.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const schema = yup.object().shape({
  role: yup.string().required("role is required"),
});
export default function UserTable({ users, setUsers }) {
  const [draggedIndex, setDraggedIndex]=React.useState('');
  const [page, setPage] = React.useState(0);
  const [editId, setEditId] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [id, setId] = React.useState();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (e) => {
    const dialog = document.querySelector("dialog");
    dialog.show();
    setId(e);
  };

  const handleOpenEditDialog = (e) => {
    const dialog = document.getElementById("dialog");
    dialog.show();
    console.log(e);
    setValue("role", e.role);
    setEditId(e._id);
  };

  const handleEditClose = () => {
    const dialog = document.getElementById("dialog");
    dialog.close();
  };

  const handleClose = () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/deleteuser/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setUsers((prevBlog) => prevBlog.filter((item) => item._id !== id));
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const onSubmit = (data) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/edituser/${editId}`, data)
      .then((res) => {
        toast.success(res.data.message);
          setUsers((prevUsers) => prevUsers.map((item) => item._id === editId ? {...item,role:data.role}:item));
          handleEditClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const onDragOver=(e)=>{
    e.preventDefault();
  }

  const onDragStart=(id)=>{
    setDraggedIndex(id);
  }

  const onDrop=(id)=>{
    if(draggedIndex===null)return;

    const [draggedItem]=users.splice(draggedIndex,1);
    users.splice(id,0,draggedItem);

    setDraggedIndex(null);
  }
  return (
    <TableContainer component={Paper} sx={{ padding: "40px", width: "90%" }}>
      <dialog
      className="deleteDialog"
      >
        <Box>
          <Typography>Are you sure you want to delete this user ? </Typography>
          <Box sx={{ marginTop: "15%" }}>
            <Button sx={{ color: "red" }} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </dialog>

      <dialog
        id="dialog"
        
      >
        <Box>
          <Typography>Are you sure you want to edit this user role?</Typography>
          <Box sx={{ marginTop: "15%" }}>
           
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} error={Boolean(errors?.role)}>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errors?.role?.message}
                  </p>
                )}
              </FormControl>

              <Box sx={{ marginTop: "20px", paddingBottom: "20px" }}>
               
                <Button
                  sx={{ color: "red", marginRight: "10px" }}
                  type="submit"
                >
                  Edit
                </Button>
                <Button onClick={handleEditClose}>No</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </dialog>

      {users.length>0 ? 
      <Table sx={{ width:'100%' }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Profile Picture</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Bio</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Info</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map(
            (data,index) =>
              data._id !== sessionStorage.getItem("id") && (
                <TableRow key={data?._id}
                draggable
                onDragStart={()=>onDragStart(index)}
                onDrop={()=>onDrop(index)}
                onDragOver={onDragOver}
                
                >
                  <TableCell component="th" align="center" scope="row">
                    <img
                      src={data?.author_image}
                      alt=""
                      style={{
                        width: "250px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center" >
                    {data?.email}
                  </TableCell>

                  <TableCell style={{ width: 160 }} align="center" >
                    {data?.author_bio.slice(0, 100)}...
                  </TableCell>

                  <TableCell style={{ width: 160 }} align="center">
                    {data?.author_name}
                  </TableCell>

                  <TableCell style={{ width: 160 }} align="center">
                    {data?.role}
                  </TableCell>

                  <TableCell style={{ width: 160 }} align="center" sx={{textAlign:"justify"}}>
                    {data?.author_info.slice(0, 100)}...
                  </TableCell>

                  <TableCell style={{ width: 260 }} align="center">
                    <Button variant="contained" onClick={(e) => handleOpenEditDialog(data)} sx={{borderRadius:"20px"}}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={(e) => handleOpenDialog(data._id)} sx={{borderRadius:"20px",marginLeft:"5px",marginTop:"2px"}}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter sx={{ width: "100%" }}>
          <TableRow >
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}    
              colSpan={7}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>:
        <Typography variant="body2" color="text.secondary" align="center">No Records to show.</Typography>
      }
    </TableContainer>
  );
}
