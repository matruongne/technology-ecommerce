import axios from 'axios'

export const UploadImage = (file) => {
	const url = `https://api.cloudinary.com/v1_1/cloudecommercezz/upload`
	const fd = new FormData()
	fd.append('upload_preset', 'ydcfz76w')
	fd.append('tags', 'browser_upload')
	fd.append('folder', '/Ecommerce')
	fd.append('file', file)

	return new Promise(async (resolve, reject) => {
		await axios
			.post(url, fd)
			.then((response) => resolve({ data: response.data }))
			.catch((error) => {
				console.error('Error uploading the file:', error)
				reject('Error to login: ' + error.response.data)
			})
	})
}
// const url = data.secure_url
//token to delete
// 				const tokens = url.split('/')
// 				tokens.splice(-3, 0, 'w_150,c_scale')
// 				const img = tokens.join('/')
// 				return img
