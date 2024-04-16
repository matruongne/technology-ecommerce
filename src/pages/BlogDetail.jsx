import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'

import { selectUserInfo } from './../redux/Slices/User/userSlice'
import {
	createCommentAsync,
	editPostAsync,
	getAllPostAsync,
	getPostByIdAsync,
} from '../redux/Slices/Posts/postSlice'
import { selectPostById } from './../redux/Slices/Posts/postSlice'
import { selectAllPosts } from '../redux/Slices/Posts/postSlice'

import { BsFilePost, BsPostcardFill } from 'react-icons/bs'
import { FaCircleUser } from 'react-icons/fa6'
import { IoIosReturnLeft } from 'react-icons/io'
import { UploadImage } from '../components/Upload/UploadImage'
import ImagetoBase64 from './../utils/ImagetoBase64'
import toast from 'react-hot-toast'
import HeadlessModal from '../components/Modals/HeadlessModal'

const BlogDetail = () => {
	const { blogId } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [modalData, setModalData] = useState({})
	const [open, setOpen] = useState(false)
	const [image, setImage] = useState('')
	const [title, setTitle] = useState('')
	const [bodyText, setBodyText] = useState('')
	const [comment, setComment] = useState('')

	const postDetail = useSelector(selectPostById)
	const posts = useSelector(selectAllPosts)
	const userInfo = useSelector(selectUserInfo)

	useEffect(() => {
		dispatch(getPostByIdAsync(blogId))
		dispatch(getAllPostAsync())
	}, [dispatch, blogId])

	const handleSubmitComment = () => {
		dispatch(createCommentAsync({ text: comment, postId: blogId }))
		window.location.reload()
	}

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
	const handleEditPost = async () => {
		let editPost = {}
		if (image) {
			const result = await UploadImage(image)

			if (result.data.secure_url && title !== '')
				editPost = {
					title: title,
					text: bodyText,
					images: [result.data.secure_url],
				}
		} else toast.error('Error editing')
		console.log(editPost)
		dispatch(editPostAsync({ blogId, post: editPost })).then(() => window.location.reload())
	}
	return (
		<>
			{postDetail && userInfo && (
				<>
					<HeadlessModal {...modalData} open={open} setOpen={setOpen} handle={handleEditPost}>
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
								<span className="text-lg bg-white text-gray-800 text-opacity-80">bodyText</span>
								<textarea
									type="text"
									placeholder="bodyText"
									value={bodyText}
									onChange={(e) => setBodyText(e.target.value)}
									className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
									rows="7"
									cols="160"
								/>
							</label>
						</div>
					</HeadlessModal>
					<Navbar userInfo={userInfo} />
					<div className="mt-6 container bg-gray-50">
						<div className="flex items-center justify-between">
							<div
								className="cursor-pointer flex flex-row text-secondary items-center hover:text-primary max-w-[200px]"
								onClick={() => {
									navigate('/blog')
								}}
							>
								<IoIosReturnLeft className=" text-4xl" />
								<span className="ml-2 uppercase font-semibold">All Posts</span>
							</div>
							{postDetail.post.poster._id === userInfo.id && (
								<button
									className="text-white px-4 py-3 bg-secondary hover:bg-primary rounded-lg"
									onClick={() => {
										setOpen(!open)
										setImage(postDetail.post?.images[0])
										setTitle(postDetail.post.title)
										setBodyText(postDetail.post.text)
										setModalData({
											handleEditPost,
											title: 'Edit your post',
											subtitle: 'Revise and Refine: Enhance Your Post with These Edits',
											btnTitle: 'Edit',
											classNames: 'sm:max-w-[800px]',
										})
									}}
								>
									Edit Post
								</button>
							)}
						</div>
						<div className="py-6 mx-auto">
							<div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
								{postDetail.post?.images.length > 0 ? (
									<img
										src={postDetail.post?.images[0]}
										alt={postDetail.post.title}
										className="object-cover w-full shadow-sm h-full rounded-md"
									/>
								) : (
									<BsPostcardFill className="object-cover w-full shadow-sm h-full" />
								)}
								<div className="mt-12 px-8">
									<div className="text-4xl uppercase font-bold text-primary hover:underline">
										{postDetail.post.title}
									</div>
									<div className="flex justify-end items-center mt-2">
										<p className="text-sm font-bold bg-gray-100 rounded-full py-2 px-2 text-primary">
											{postDetail.post.comments.length || 0}
										</p>
										<p className="text-sm font-bold text-primary">Comments</p>
									</div>
									<div className="font-light text-gray-600">
										<div className="flex items-center">
											{postDetail.post.poster?.images ? (
												<img
													src={postDetail.post.poster?.images}
													className="hidden object-cover w-14 h-14 rounded-full sm:block border-primary border-2"
												/>
											) : (
												<FaCircleUser className="hidden object-cover w-14 h-14 rounded-full sm:block border-primary border-2" />
											)}

											<h1 className="ml-4 font-bold text-xl text-gray-700 hover:underline">
												{postDetail.post.poster.name || postDetail.post.poster.email}
											</h1>
										</div>
									</div>
								</div>
								<div className="max-w-4xl px-10 mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
									<div>
										<p className="mt-2 p-8">{postDetail.post.text}</p>
									</div>
								</div>
							</div>
							<h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">Related Posts</h2>
							<div className="h-full pb-10 mt-8 sm:mt-16">
								<div className="flex justify-between">
									{/* Related Post*/}
									{posts.posts?.slice(0, 3).map((post, index) => (
										<div key={index}>
											<button
												onClick={() => {
													navigate('/blog/' + post._id)
													window.scrollTo({
														top: 0,
														behavior: 'smooth',
													})
												}}
											>
												<div className="cursor-pointer bg-gray-200 border-r border-gray-300 shadow-[3.0px_6.0px_18.0px_rgba(0,0,0,0.18)] rounded-2xl">
													{post?.images.length > 0 ? (
														<img
															src={post?.images[0]}
															alt={post.title}
															className="rounded-t-2xl object-cover w-[340px] h-[250px]"
														/>
													) : (
														<BsPostcardFill className="w-[340px] h-[250px]" />
													)}
													<div className="w-full flex justify-between flex-col mt-4">
														<div>
															<h2 className="text-[23px] font-bold">
																<div className="line-clamp-1">{post.title}</div>
															</h2>
														</div>
														<div className="flex items-end justify-between my-4 m-8">
															<div className="flex items-center">
																{post.poster[0]?.images ? (
																	<img
																		src={post.poster[0]?.images}
																		className="w-[40px] h-[40px] rounded-full border-primary border"
																	/>
																) : (
																	<FaCircleUser className="w-[40px] h-[40px] rounded-full object-cover object-center border-primary border" />
																)}
																<div className="ml-2">
																	<h3 className="font-bold text-base text-gray-700">
																		{post.poster[0].name || post.poster[0].email}
																	</h3>
																	<h3 className="text-gray-500 text-xs">
																		<p className="block leading-relaxed antialiased">
																			{new Date(post.createdAt).toLocaleDateString('vi-VN')}
																		</p>
																	</h3>
																</div>
															</div>
															<div className="ml-2">
																<h3 className="text-gray-500">
																	<p className="block font-sans text-base font-normal leading-relaxed text-primary antialiased">
																		{post._commentsCount} Comments
																	</p>
																</h3>
															</div>
														</div>
													</div>
												</div>
											</button>
										</div>
									))}
								</div>
							</div>
							<div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
								<div className="w-full mt-16 md:mt-0 ">
									<form className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-gray-300 border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
										<h3 className="mb-6 text-2xl font-medium text-center">Write a comment</h3>
										<textarea
											type="text"
											className="w-full px-4 py-3 mb-4 border border-transparent border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
											placeholder="Write your comment"
											rows="5"
											cols="33"
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										></textarea>
										<button
											className="text-white px-4 py-3 bg-primary rounded-lg"
											onClick={() => handleSubmitComment()}
										>
											Submit comment
										</button>
									</form>
								</div>
							</div>
							<div className="max-w-4xl py-16 mx-auto bg-gray-100 min-w-screen animation-fade animation-delay sm:px-12 xl:px-5">
								<p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
									All comments on this post
								</p>
								{postDetail.post.comments.map((comment, index) => (
									<div
										key={index}
										className="flex items-center w-full mx-auto bg-gray-300 border border-gray-200 rounded-lg shadow-lg mt-4"
									>
										<div className="flex items-center">
											{comment.commentator?.images ? (
												<img
													src={comment.commentator?.images}
													className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
												/>
											) : (
												<FaCircleUser className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
											)}
										</div>
										<div>
											<h3 className="text-lg font-bold text-secondary">
												{comment.commentator.name || comment.commentator.email}
											</h3>
											<p className="text-base font-semibold text-gray-400">
												{new Date(comment.commentator.createdAt).toLocaleDateString('vi-VN')}
											</p>
											<p className="mt-2 text-base text-gray-600">{comment.text}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default BlogDetail
