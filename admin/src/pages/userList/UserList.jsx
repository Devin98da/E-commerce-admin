import React, { useState } from 'react'
import './userList.css';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { userRows } from "../../dummyData";

const UserList = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    console.log(data);
  }
  const paginationModel = { page: 0, pageSize: 5 };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.data.avatar} alt={params.data.username} />

            {params.data.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Link to={"/user/" + params.data.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.data.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className='userList'>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        initialState={{ pagination: { paginationModel } }}
      />
    </div>
  )
}

export default UserList