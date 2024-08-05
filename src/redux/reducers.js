import { ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, DELETE_MULTIPLE_PRODUCTS } from './actions';

const initialState = {
    products: JSON.parse(localStorage.getItem('products')) || [],
};

const rootReducer = (state = initialState, action) => {
    let updatedProducts;

    switch (action.type) {
        case ADD_PRODUCT:
            updatedProducts = [...state?.products, action?.payload];
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            return {
                ...state,
                products: updatedProducts,
            };
        case EDIT_PRODUCT:
            updatedProducts = state?.products?.map((product) =>
                product.id === action?.payload?.id ? action.payload : product
            );
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            return {
                ...state,
                products: updatedProducts,
            };
        case DELETE_PRODUCT:
            updatedProducts = state?.products?.filter((product) => product.id !== action?.payload);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            return {
                ...state,
                products: updatedProducts,
            };
        case DELETE_MULTIPLE_PRODUCTS:
            updatedProducts = state?.products?.filter((product) => !action.payload.includes(product?.id));
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            return {
                ...state,
                products: updatedProducts,
            };
        default:
            return state;
    }
};

export default rootReducer;
