import React, { useState } from 'react';
import './newProduct.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';


const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // console.log(inputs)

    const handleCat = (e) => {
        setCat(e.target.value.split(",").map(item => item.trim()));
    };

    const handleColor = (e) => {
        setColor(e.target.value.split(",").map(item => item.trim()));
    }

    const handleSize = (e) => {
        setSize(e.target.value.split(",").map(item => item.trim()));
    }

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        setLoading(true);
        setError(null);

        // File upload logic
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                console.error("Upload failed:", error);
                setError("File upload failed. Please try again.");
                setLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, image: downloadURL, categories: cat, size: size, color: color };
                    console.log(product)
                    addProduct(dispatch, product)
                        .then(() => {
                            setLoading(false);
                            alert("Product created successfully!");
                            navigate('/products')
                        })
                        .catch((error) => {
                            setError("Product creation failed. Please try again.");
                            setLoading(false);
                        })
                });
            }
        );
    };

    // Warn user before leaving if still loading
    window.onbeforeunload = loading ? () => true : null;

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input name='title' type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input name='description' type="text" placeholder="Description..." onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input name='price' type="number" placeholder="100" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input type="text" placeholder="jeans, skirts" onChange={handleCat} />
                </div>
                <div className="addProductItem">
                    <label>Promotion</label>
                    <input name='promotion' min={0} max={99} type="number" placeholder="100" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Color</label>
                    <input type="text" placeholder="black, red" onChange={handleColor} />
                </div>
                <div className="addProductItem">
                    <label>Size</label>
                    <input type="text" placeholder="s, m" onChange={handleSize} />
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock" id="stock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <button onClick={handleClick} className="addProductButton" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
                {loading && <p>Creating product, please wait...</p>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    );
};

export default NewProduct;
