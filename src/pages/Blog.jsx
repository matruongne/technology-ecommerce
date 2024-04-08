import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useEffect, useState } from 'react'

import IntroPost from '../components/Blog/IntroPost'
import Blogs from '../components/Blog/Blogs'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { getAllPostAsync } from '../redux/Slices/Posts/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import HeadlessModal from '../components/Modals/HeadlessModal'
import ImagetoBase64 from '../utils/ImagetoBase64'
import { BsFilePost } from 'react-icons/bs'
import { UploadImage } from '../components/Upload/UploadImage'
import { createPostAsync } from './../redux/Slices/Posts/postSlice'
import toast from 'react-hot-toast'

const Blog = () => {
	const [posts, setPosts] = useState([])
	const [modalData, setModalData] = useState({})
	const [open, setOpen] = useState(false)
	const [image, setImage] = useState('')
	const [title, setTitle] = useState('')
	const [bodyText, setBodyText] = useState('')
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)

	useEffect(() => {
		dispatch(getAllPostAsync()).then((results) => setPosts(results.payload.posts))
	}, [dispatch])

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-sine',
			delay: 100,
			offset: 100,
		})
		AOS.refresh()
	}, [])

	const handleChangeImage = (e) => {
		e.preventDefault()
		const file = e.target.files?.[0]
		if (!file) {
			setImage('')
			return
		}
		if (!file.type.includes('image')) {
			setImage('')
			return alert('Please select an image file to display in the browser and try again')
		}

		ImagetoBase64(file).then((result) => {
			setImage(result)
		})
	}

	const handleCreatePost = async () => {
		let createPost = {}
		if (image) {
			const result = await UploadImage(image)

			if (result.data.secure_url && title !== '')
				createPost = {
					title: title,
					text: bodyText,
					images: [result.data.secure_url],
				}
		} else toast.error('Error creating')

		dispatch(createPostAsync(createPost)).then(() => window.location.reload())
	}

	return (
		<>
			{userInfo && (
				<>
					<Navbar userInfo={userInfo} />
					{posts && (
						<div className="container pt-6">
							<HeadlessModal {...modalData} open={open} setOpen={setOpen} handle={handleCreatePost}>
								<div className="w-full">
									<span className="text-lg bg-white text-gray-800 text-opacity-80 px-1 block pb-2">
										Image
									</span>
									<div className="flex items-center space-x-6">
										<div className="shrink-0">
											{image ? (
												<img
													id="preview_img"
													className="h-16 w-16 object-cover border border-primary rounded-lg"
													src={null || image}
													alt="Current profile photo"
												/>
											) : (
												<BsFilePost className="h-16 w-16 object-cover" />
											)}
										</div>
										<label className="block">
											<span className="sr-only">Choose profile photo</span>
											<input
												type="file"
												accept="image/*"
												onChange={handleChangeImage}
												className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
											/>
										</label>
									</div>
								</div>
								<div className="w-full">
									<label className="relative cursor-pointer">
										<input
											type="text"
											placeholder="title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
										/>
										<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
											Title
										</span>
									</label>
								</div>
								<div className="w-full">
									<label className="relative cursor-pointer">
										<textarea
											type="text"
											placeholder="bodyText"
											value={bodyText}
											onChange={(e) => setBodyText(e.target.value)}
											className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
										/>
										<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -top-9 px-1 transition duration-200 input-text">
											bodyText
										</span>
									</label>
								</div>
							</HeadlessModal>
							<span className="text-2xl font-semibold w-full flex items-center justify-between p-6 uppercase">
								<span>new Post</span>
								<button
									className="text-white px-4 py-3 bg-secondary hover:bg-primary rounded-lg"
									onClick={() => {
										setOpen(!open)

										setModalData({
											handleCreatePost,
											title: 'Create a new post',
											subtitle:
												'Unleash Your Creativity: Crafting Captivating Subtitles for Your Next Post',
											btnTitle: 'Create',
											classNames: 'sm:max-w-lg',
										})
									}}
								>
									Create Post
								</button>
							</span>
							{/* IntroPost */}
							{posts.length > 0 ? <IntroPost post={posts[0]} /> : null}
							{/* Blogs */}
							{posts.length > 0 ? (
								<div>
									<span className="text-xl font-semibold block p-6 uppercase">All posts</span>
									<Blogs posts={posts} />
								</div>
							) : null}
						</div>
					)}
				</>
			)}
		</>
	)
}

export default Blog
