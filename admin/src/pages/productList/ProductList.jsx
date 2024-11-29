import React, { useEffect, useState } from 'react'
import './productList.css';
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { productRows } from "../../dummyData";
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, deleteObject, getDownloadURL } from "firebase/storage";
import app from '../../firebase';


const ProductList = () => {
    const products = useSelector(state => state.product.products);
    const [data, setData] = useState(products);
    const dispatch = useDispatch();
    console.log(products)

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = async (product) => {
        try {
            const storage = getStorage(app);
            const imageRef  = ref(storage, product.image);
            await deleteObject(imageRef);
            
        } catch (error) {
            console.log(error)
        }
        deleteProduct(dispatch, product._id);
        console.log(product)
        setData(data.filter(item => item.id !== product._id));
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
                        <Link to={"/products/" + params.row?._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row)}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div className='productList'>
            <div className="productListHeader">
                <Link to='/newProduct/'>
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={data}
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