export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_MULTIPLE_PRODUCTS = 'DELETE_MULTIPLE_PRODUCTS';

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product,
});

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id,
});

export const deleteMultipleProducts = (ids) => ({
    type: DELETE_MULTIPLE_PRODUCTS,
    payload: ids,
});
