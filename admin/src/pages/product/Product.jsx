import React, { useEffect, useMemo, useState } from 'react';
import './product.css';
import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';

const Product = () => {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [inputs, setInputs] = useState({});
    const product = useSelector(state => state.product.products.find((product) => product._id === productId));

    const [pStats, setPStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",
        ],
        []
    );

    useEffect(() => {
        if (product) {
            setInputs({
                title: product.title,
                description: product.description,
                price: product.price,
                promotion: product.promotion,
                inStock: product.inStock ? 'true' : 'false',
                image: product.image
            })
        }
    }, [product])

    useEffect(() => {

        const getUserStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pId=" + productId);
                // console.log(res.data)

                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                console.log(res.data)
                console.log(list)
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        }

        getUserStats();

    }, [productId, MONTHS])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    console.log(inputs)

    return (
        <div className='product'>
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to='/newProduct/'>
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="prodcutTop">
                <div className="prodcutTopLeft">
                    <Chart title="Sales Perfomence" data={pStats} dataKey="Sales" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={inputs.image} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="keyProdutInfoId">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        {/* <div className="productInfoItem">
                            <span className="productInfoKey">active:</span>
                            <span className="productInfoValue">yes</span>
                        </div> */}
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="prodcutBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input name='name' type="text" value={inputs.title} onChange={handleInputChange}/>
                        <label>Product Description</label>
                        <input name='description' type="text" value={inputs.description} onChange={handleInputChange}/>
                        <label>Product Price</label>
                        <input name='price' type="text" value={inputs.price} onChange={handleInputChange}/>
                        <label>Promotion</label>
                        <input name='promotion' type="text" value={inputs.promotion} onChange={handleInputChange}/>
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" value={inputs.inStock} onChange={handleInputChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={inputs.image} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product