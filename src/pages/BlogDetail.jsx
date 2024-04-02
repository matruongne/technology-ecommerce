import React from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
	const { blogId } = useParams()
	console.log(blogId)
	return <div>BlogDetail</div>
}

export default BlogDetail
