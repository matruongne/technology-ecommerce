import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import IntroPost from '../components/Blog/IntroPost'
import Blogs from '../components/Blog/Blogs'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Data = [
	{
		id: 1,
		title: 'Post1',
		desc: 'Posts1 Desc',
		tags: 'post1 tag',
		coverImage:
			'https://th.bing.com/th/id/R.6b960e9bfd4dfa87be3b4db9270e0f4d?rik=liZwxSywJoVtCA&pid=ImgRaw&r=0',
	},
	{
		id: 2,
		title: 'Post2',
		desc: 'Posts2 Desc',
		tags: 'post2 tag',
		coverImage:
			'https://th.bing.com/th/id/R.6b960e9bfd4dfa87be3b4db9270e0f4d?rik=liZwxSywJoVtCA&pid=ImgRaw&r=0',
	},
	{
		id: 3,
		title: 'Post3',
		desc: 'Posts3 Desc',
		tags: 'post3 tag',
		coverImage:
			'https://th.bing.com/th/id/R.6b960e9bfd4dfa87be3b4db9270e0f4d?rik=liZwxSywJoVtCA&pid=ImgRaw&r=0',
	},
	{
		id: 4,
		title: 'Post4',
		desc: 'Posts4 Desc',
		tags: 'post4 tag',
		coverImage:
			'https://th.bing.com/th/id/R.6b960e9bfd4dfa87be3b4db9270e0f4d?rik=liZwxSywJoVtCA&pid=ImgRaw&r=0',
	},
	{
		id: 5,
		title: 'Post5',
		desc: 'Posts5 Desc',
		tags: 'post5 tag',
		coverImage:
			'https://th.bing.com/th/id/R.6b960e9bfd4dfa87be3b4db9270e0f4d?rik=liZwxSywJoVtCA&pid=ImgRaw&r=0',
	},
]

const Blog = () => {
	const [post, setPost] = useState([])

	useEffect(() => {
		getPost()
	}, [])

	const getPost = () => {
		const result = Data

		setPost(result)
	}

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-sine',
			delay: 100,
			offset: 100,
		})
		AOS.refresh()
	}, [])

	return (
		<div>
			<Navbar />
			<div className="container pt-6">
				<span className="text-2xl font-semibold w-full block p-6">BLOG</span>
				{/* IntroPost */}
				{post.length > 0 ? <IntroPost post={post[0]} /> : null}
				{/* Blogs */}
				{post.length > 0 ? (
					<div>
						<span className="text-xl font-semibold block p-6 uppercase">All post</span>
						<Blogs posts={post} />
					</div>
				) : null}
			</div>
		</div>
	)
}

export default Blog
