import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/User/userSlice'
import authReducer from './Slices/Auth/authSlice'
import postReducer from './Slices/Posts/postSlice'
import categoryReducer from './Slices/Category/categorySlice'
import brandReducer from './Slices/Brand/brandSlice'
import productReducer from './Slices/Product/productSlice'
import cartReducer from './Slices/Cart/cartSlice'
import orderReducer from './Slices/Order/orderSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		post: postReducer,
		category: categoryReducer,
		brand: brandReducer,
		product: productReducer,
		cart: cartReducer,
		order: orderReducer,
	},
})
