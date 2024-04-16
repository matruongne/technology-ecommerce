import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProduct, getProductById, getProductsByFilters, updateProduct } from './productAPI'

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
export const getProductByIdAsync = createAsyncThunk('product/getProductById', async (productId) => {
	const response = await getProductById(productId)
	return response.data
})

export const createProductAsync = createAsyncThunk('product/create', async (product) => {
	const response = await createProduct(product)
	return response.data
})

export const updateProductAsync = createAsyncThunk('product/update', async (update) => {
	const response = await updateProduct(update)
	return response.data
})

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		clearSelectedProduct: (state) => {
			state.selectedProduct = null
		},
	},
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
			.addCase(createProductAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createProductAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.products.push(action.payload)
			})
			.addCase(updateProductAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateProductAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				const index = state.products.findIndex((product) => product.id === action.payload.id)
				state.products[index] = action.payload
				state.selectedProduct = action.payload
			})
	},
})

export const { clearSelectedProduct } = productSlice.actions

export const selectAllProducts = (state) => state.product.products
export const selectProductDetail = (state) => state.product.selectedProduct

export const selectTotalItems = (state) => state.product.totalItems

export default productSlice.reducer
