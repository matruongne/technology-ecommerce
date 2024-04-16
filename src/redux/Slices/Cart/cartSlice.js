import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DeleteFromCart, addToCart, getCartByUser, resetCart, updateCart } from './cartAPI'
import toast from 'react-hot-toast'

const initialState = {
	status: 'idle',
	carts: [],
}

export const addToCartAsync = createAsyncThunk('cart/addToCart', async (item) => {
	const response = await addToCart(item)
	toast.success('Added to cart')
	return response.data
})

export const getCartByUserAsync = createAsyncThunk('cart/getCartByUser', async () => {
	const response = await getCartByUser()
	return response.data
})

export const updateCartAsync = createAsyncThunk('cart/updateCart', async (cart) => {
	const response = await updateCart(cart)
	toast.success('Update quanlity to cart')
	return response.data
})

export const DeleteFromCartAsync = createAsyncThunk('cart/DeleteFromCart', async (cartId) => {
	const response = await DeleteFromCart(cartId)
	toast.success('Delete from cart')
	return { data: response.data, cartId }
})

export const resetCartAsync = createAsyncThunk('cart/resetCart', async () => {
	const response = await resetCart()
	return response.data
})

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.carts.push(action.payload.result)
			})
			.addCase(getCartByUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getCartByUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.carts = action.payload
			})
			.addCase(updateCartAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateCartAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				const index = state.carts.findIndex((item) => item.id === action.payload.id)
				state.carts[index] = action.payload
			})
			.addCase(DeleteFromCartAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(DeleteFromCartAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				console.log(action.payload)
				const index = state.carts.findIndex((item) => item.id === action.payload.cartId)
				state.carts.splice(index, 1)
			})
			.addCase(resetCartAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(resetCartAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.carts = []
			})
	},
})

export const selectAllCarts = (state) => state.cart.carts

export default cartSlice.reducer
