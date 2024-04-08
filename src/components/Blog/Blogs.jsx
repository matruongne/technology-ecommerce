import React from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { BsPostcardFill } from 'react-icons/bs'

function Blogs({ posts }) {
	const navigate = useNavigate()
	const delay = 200
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map((post, index) => (
				<div
					key={post._id}
					className="cursor-pointer bg-gray-200 rounded-2xl shadow-[3.0px_6.0px_18.0px_rgba(0,0,0,0.18)]"
					data-aos="fade-up"
					data-aos-delay={delay + index * 100}
					onClick={() => {
						navigate('/blog/' + post._id)
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}}
				>
					{post.images.length > 0 ? (
						<img src={post.images[0]} className="w-full rounded-t-2xl object-cover h-[200px]" />
					) : (
						<BsPostcardFill className="m-auto w-full h-[200px] " />
					)}
					<div className="m-5">
						<h3 className="font-bold mt-3">
							<div className="line-clamp-1">{post.title}</div>
						</h3>
						<h3 className="text-gray-400 mt-3">
							<div className="line-clamp-2">{post.text}</div>
						</h3>
						<div className="flex items-end justify-between mt-5">
							<div className="flex items-center">
								{post.poster[0].images ? (
									<img
										src={post.poster[0].images}
										className="w-[35px] h-[35px] rounded-full border-primary border"
									/>
								) : (
									<FaCircleUser className="w-[35px] h-[35px] rounded-full object-cover object-center border-primary border" />
								)}
								<div className="ml-2">
									<h3 className="font-semibold text-[12px]">
										{post.poster[0].name || post.poster[0].email}
									</h3>
									<h3 className="text-gray-500 text-[10px]">
										<p className="block font-sans font-normal leading-relaxed text-inherit antialiased">
											{new Date(post.createdAt).toLocaleDateString('vi-VN')}
										</p>
									</h3>
								</div>
							</div>
							<h3 className="text-gray-500 text-[10px]">
								<p className="block font-sans font-normal leading-relaxed text-inherit antialiased">
									{post._commentsCount} Comments
								</p>
							</h3>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Blogs
