import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProductById, getProductsByFilters } from './productAPI'

const initialState = {
	status: 'idle',
	products: [],
	totalItems: 0,
	selectedProduct: null,
}

export const getProductsByFiltersAsync = createAsyncThunk(
	'product/getProductsByFilters',
	async ({ filter, sort, pagination, admin }) => {
		const response = await getProductsByFilters(filter, sort, pagination, admin)
		return response.data
	}
)
export const getProductByIdAsync = createAsyncThunk('post/getProductById', async (productId) => {
	const response = await getProductById(productId)
	return response.data
})

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProductsByFiltersAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getProductsByFiltersAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.products = action.payload.products
				state.totalItems = action.payload.totalItems
			})

			.addCase(getProductByIdAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getProductByIdAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.selectedProduct = action.payload
			})
	},
})
export const selectAllProducts = (state) => state.product.products
export const selectProductDetail = (state) => state.product.selectedProduct

export const selectTotalItems = (state) => state.product.totalItems

export default productSlice.reducer
