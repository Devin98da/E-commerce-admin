import React, { useEffect, useState } from 'react'
import './productList.css';
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { productRows } from "../../dummyData";
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';


const ProductList = () => {

    const [data, setData] = useState(productRows);
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteProduct(dispatch, id);
        setData(data.filter(item => item.id !== id));
    }
    const paginationModel = { page: 0, pageSize: 5 };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem" key={params.row?._id}>
                        <img className="productListImg" src={params.row?.image} alt="" />
                        {params.row?.title}
                    </div>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="productListItem" key={params.row?._id}>
                        <Link to={"/products/"+params.row?._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row?._id)}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div className='productList'>
            <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                getRowId={(row) => row._id}
                checkboxSelection
            />
        </div>
    )
}

export default ProductList