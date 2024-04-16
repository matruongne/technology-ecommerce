import axios from 'axios'

export function createBrand(brand) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3300/api/brands/`, brand)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getAllBrand() {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3300/api/brands/`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
