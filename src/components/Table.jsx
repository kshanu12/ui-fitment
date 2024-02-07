import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { editUser, deleteUser } from "@/redux/usersSlice";
import styles from "@/styles/Home.module.css";

export default function Table({ users }) {
  const dispatch = useDispatch();

  const editHandler = (updated) => {
    dispatch(editUser({ updated }));
  };

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const deleteSelectedRows = () => {
    selectedRows.forEach((id) => {
      dispatch(deleteUser(id));
    });
    setSelectedRows([]);
  };

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "icons",
      width: 150,
      renderCell: (params) => (
        <div className={styles.actionIcons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => editHandler(params.row)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            stroke-width="1.5"
            stroke="red"
            className="w-6 h-6"
            onClick={() => deleteHandler(params.row.id)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      ),
    },
  ];
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const startIndex = (page - 1) * pageSize;
  const slicedRows = users.slice(startIndex, startIndex + pageSize);

  const handleRowUpdate = (updated, original) => {
    dispatch(editUser({ updated }));
  };

  return (
    <>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={slicedRows}
          columns={columns}
          checkboxSelection
          hideFooterPagination
          disableRowSelectionOnClick
          processRowUpdate={handleRowUpdate}
          onRowSelectionModelChange={handleSelectionChange}
        />
        <div className={styles.pagination}>
          <button className={styles.deleteBtn} onClick={deleteSelectedRows}>
            Delete Selected
          </button>
          <Pagination
            count={Math.ceil(users.length / pageSize)}
            page={page}
            onChange={handleChangePage}
          />
          <div></div>
        </div>
      </Box>
    </>
  );
}
