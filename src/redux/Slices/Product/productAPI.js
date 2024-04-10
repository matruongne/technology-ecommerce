import axios from 'axios'

export function getProductsByFilters(filter, sort, pagination, admin) {
	// filter = {"category":["smartphone","laptops"]}
	// sort = {_sort:"price",_order="desc"}
	// pagination = {_page:1,_limit=10}

	let queryString = ''

	for (let key in filter) {
		const categoryValues = filter[key]
		if (categoryValues.length) {
			queryString += `${key}=${categoryValues}&`
		}
	}
	for (let key in sort) {
		queryString += `${key}=${sort[key]}&`
	}
	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`
	}
	if (admin) {
		queryString += `admin=true`
	}

	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3100/api/products/?` + queryString)
			.then(async (response) => {
				const totalItems = await response.headers.get('X-Total-Count')
				resolve({ data: { products: response.data, totalItems: +totalItems } })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getProductById(productId) {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3100/api/products/` + productId)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
