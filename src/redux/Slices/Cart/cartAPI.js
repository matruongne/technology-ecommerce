import axios from 'axios'

export function addToCart(item) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3300/api/cart/`, item)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getCartByUser() {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3300/api/cart/`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function updateCart(cart) {
	return new Promise(async (resolve) => {
		await axios
			.patch(`http://localhost:3300/api/cart/${cart.cartId}`, cart)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function DeleteFromCart(cartId) {
	return new Promise(async (resolve) => {
		await axios
			.delete(`http://localhost:3300/api/cart/${cartId}`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function resetCart() {
	return new Promise(async (resolve) => {
		const response = await getCartByUser()
		const items = response.data
		for (let item of items) {
			await DeleteFromCart(item.id)
		}
		resolve({ status: 'success' })
	})
}
