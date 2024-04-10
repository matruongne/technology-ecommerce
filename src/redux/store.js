import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/User/userSlice'
import authReducer from './Slices/Auth/authSlice'
import postReducer from './Slices/Posts/postSlice'
import categoryReducer from './Slices/Category/categorySlice'
import productReducer from './Slices/Product/productSlice'
import cartReducer from './Slices/Cart/cartSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		post: postReducer,
		category: categoryReducer,
		product: productReducer,
		cart: cartReducer,
	},
})
