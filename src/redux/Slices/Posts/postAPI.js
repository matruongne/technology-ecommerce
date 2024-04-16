import axios from 'axios'

export function getAllPosts() {
	return new Promise(async (resolve) => {
		await axios
			.get('http://localhost:3300/api/post/')
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getPostById(blogId) {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3300/api/post/${blogId}`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function createPost(post) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3300/api/post/`, post)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function editPost(post) {
	return new Promise(async (resolve) => {
		console.log(post.blogId, post)

		await axios
			.patch(`http://localhost:3300/api/post/${post.blogId}`, post.post)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function createComment(comment) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3300/api/comment/`, comment)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
