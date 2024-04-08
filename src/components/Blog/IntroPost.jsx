import { BsPostcardFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaCircleUser } from 'react-icons/fa6'

const IntroPost = ({ post }) => {
	const navigate = useNavigate()

	return (
		<div
			data-aos="fade-up"
			data-aos-delay={'100'}
			className="grid grid-cols-5 cursor-pointer gap-8 bg-gray-200 border-r border-gray-300 shadow-[3.0px_6.0px_18.0px_rgba(0,0,0,0.18)] rounded-2xl"
			onClick={() => navigate('/blog/' + post._id)}
		>
			{post.images.length > 0 ? (
				<img
					src={post.images[0]}
					alt={post.title}
					className="rounded-l-2xl object-cover w-[500px] h-[350px] col-span-2"
				/>
			) : (
				<BsPostcardFill className="m-auto w-[500px] h-[350px]" />
			)}
			<div className="w-full flex justify-between flex-col mt-4 col-span-3">
				<div>
					<h2 className="text-[23px] font-bold">
						<div className="line-clamp-1">{post.title}</div>
					</h2>
					<h4 className="line-clamp-6 text-gray-400 mt-5">
						<div className="line-clamp-7">{post.text}</div>
					</h4>
				</div>
				<div className="flex items-end justify-between my-8 mr-8">
					<div className="flex items-center">
						{post.poster[0].images ? (
							<img
								src={post.poster[0].images}
								className="w-[50px] h-[50px] rounded-full border-primary border"
							/>
						) : (
							<FaCircleUser className="w-[50px] h-[50px] rounded-full object-cover object-center border-primary border" />
						)}
						<div className="ml-2">
							<h3 className="font-bold ">{post.poster[0].name || post.poster[0].email}</h3>
							<h3 className="text-gray-500">
								<p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
									{new Date(post.createdAt).toLocaleDateString('vi-VN')}
								</p>
							</h3>
						</div>
					</div>
					<div className="ml-2">
						<h3 className="text-gray-500">
							<p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
								{post._commentsCount} Comments
							</p>
						</h3>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IntroPost
