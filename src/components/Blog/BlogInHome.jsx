import { BsPostcardFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaCircleUser } from 'react-icons/fa6'

const Blog = ({ posts }) => {
	const navigate = useNavigate()

	return (
		<div className="my-12">
			<div className="container">
				{/* Header section */}
				<div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
					<h1 className="text-3xl font-bold">Recent News</h1>
					<p className="text-base text-gray-400">Explore Our Posts </p>
				</div>
				{posts && (
					<div className="flex justify-between">
						{/* card */}
						{posts.posts.slice(0, 3).map((post, index) => (
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
									<div className="cursor-pointer bg-gray-200 dark:bg-gray-800 dark:shadow-[3.0px_6.0px_18.0px_rgba(0,0,0,1.88)] shadow-[3.0px_6.0px_18.0px_rgba(0,0,0,0.18)] rounded-2xl">
										{post?.images.length > 0 ? (
											<img
												src={post?.images[0]}
												alt={post.title}
												className="rounded-t-2xl object-cover w-[370px] h-[250px]"
											/>
										) : (
											<BsPostcardFill className="w-[370px] h-[250px]" />
										)}
										<div className="w-full flex justify-between flex-col mt-4">
											<div>
												<h2 className="text-[23px] font-bold">
													<div className="line-clamp-1">{post.title}</div>
												</h2>
											</div>
											<div className="flex items-end justify-between my-4 m-8">
												<div className="flex items-center">
													{post?.poster[0]?.images ? (
														<img
															src={post?.poster[0]?.images}
															className="w-[40px] h-[40px] rounded-full border-primary border"
														/>
													) : (
														<FaCircleUser className="w-[40px] h-[40px] rounded-full object-cover object-center border-primary border" />
													)}
													<div className="ml-2">
														<h3 className="font-bold text-base text-gray-700 dark:text-gray-400">
															{post.poster[0]?.name || post.poster[0]?.email}
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
				)}
			</div>
		</div>
	)
}

export default Blog
