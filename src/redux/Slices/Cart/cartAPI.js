import axios from 'axios'

export function addToCart(item) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3100/api/cart/`, item)
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
			.get(`http://localhost:3100/api/cart/`)
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
			.patch(`http://localhost:3100/api/cart/${cart.cartId}`, cart)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
