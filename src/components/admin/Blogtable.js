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
import { Button, styled, Switch, TableHead, Typography } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import { EncodeIds } from "../EncodeIds";
import axios from "axios";
import { toast } from "react-toastify";
import "./Blogtable.css";

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

const label = { inputProps: { "aria-label": "Switch demo" } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Blogtable({ blogs, setBlogs }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [id, setId] = React.useState();
  const [draggedIndex, setDraggedIndex] = React.useState();

  const navigate = useNavigate();
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogs.length) : 0;

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

  const handleClose = () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
  };
  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/deleteBlog/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setBlogs((prevBlog) => prevBlog.filter((item) => item._id !== id));
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const changeStatus = (id, status) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/change_status`, {
        id: id,
        status: status === "pending" ? "approved" : "pending",
      })
      .then((res) => {
        toast.success(res.data.message);
        setBlogs((prevBlog) =>
          prevBlog.map((item) =>
            item._id === id
              ? {
                  ...item,
                  status: status === "pending" ? "approved" : "pending",
                }
              : item
          )
        );
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const dragStart = (id) => {
    setDraggedIndex(id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (id) => {
    if (draggedIndex === null) return;

    const [draggedItem] = blogs.splice(draggedIndex, 1);
    blogs.splice(id, 0, draggedItem);

    setDraggedIndex(null);
  };
  return (
    <TableContainer component={Paper} sx={{ padding: "40px", width: "90vw" }}>
      <dialog className="dialog">
        <Box>
          <Typography>Are you sure you want to delete this post ? </Typography>
          <Box sx={{ marginTop: "15%" }}>
            <Button sx={{ color: "red" }} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </Box>
      </dialog>
      {blogs.length > 0 ? (
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center">Author</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? blogs.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : blogs
            ).map((data, index) => (
              <TableRow
                key={data?._id}
                draggable
                onDragStart={(e) => dragStart(index)}
                onDrop={(e) => onDrop(index)}
                onDragOver={onDragOver}
              >
                <TableCell component="th" scope="row">
                  <img id="img" src={data?.image_url} alt="" />
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Switch
                    {...label}
                    defaultChecked={data?.status === "approved"}
                    onChange={(e) => {
                      changeStatus(data?._id, data?.status);
                    }}
                  />
                </TableCell>

                <TableCell style={{ width: 160 }} align="center">
                  {data?.card_title}
                </TableCell>

                <TableCell style={{ width: 160 }} align="center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data.body.slice(0, 100),
                    }}
                  />
                  ...
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {data?.user?.author_name}
                </TableCell>
                <TableCell style={{ width: 273 }} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "20px" }}
                    onClick={(e) =>
                      navigate(
                        `/admin-read-blog/${EncodeIds(data._id, data.user._id)}`
                      )
                    }
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: "20px",
                      marginLeft: "5px",
                      marginTop: "2px",
                    }}
                    onClick={(e) => handleOpenDialog(data._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter sx={{ width: "100vw" }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={blogs.length}
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
        </Table>
      ) : (
        <Typography variant="body2" align="center">
          No Records to show.
        </Typography>
      )}
    </TableContainer>
  );
}
