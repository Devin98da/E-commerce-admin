import { loginFailure, loginStart, loginSuccess } from './UserRedux';
import { publicRequest, userRequest } from '../requestMethod';
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from './ProductRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());

    try {
        const res = await publicRequest.get('/products');
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
}

export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());

    try {
        const res = await userRequest.delete('/products/delete/' + id);
        console.log(id);
        console.log(res.data);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure());
        console.log(error)
    }
}

export const updateProduct = async (dispatch, product, id) => {
    dispatch(updateProductStart());

    try {
        const res = await userRequest.put('/products/update/' + id, product);
        console.log(id)
        dispatch(updateProductSuccess({ id, product }));
    } catch (error) {
        dispatch(updateProductFailure());
    }
}

export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());

    try {
        const res = await userRequest.post('/products/create', product);
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure());
        console.error("Add Product Error:", error);

    }
}