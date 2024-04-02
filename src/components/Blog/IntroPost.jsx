import { useNavigate } from 'react-router-dom'

const IntroPost = ({ post }) => {
	const navigate = useNavigate()
	return (
		<div
			data-aos="fade-up"
			data-aos-delay={'100'}
			className="grid grid-cols-1 cursor-pointer md:grid-cols-2 gap-8 bg-gray-200 rounded-2xl"
			onClick={() => navigate('/blog/' + post.id)}
		>
			<img src={post.coverImage} className="rounded-2xl object-cover w-[500px] h-[350px]" />
			<div>
				<h4 className="text-red-500">{post.tag}</h4>
				<h2 className="text-[23px] font-bold mt-5">{post.title}</h2>
				<h4 className="line-clamp-6 text-gray-400 mt-5">{post.desc}</h4>
				<div className="flex items-center mt-5">
					<img
						src="https://courses.tubeguruji.com/static/media/logo.8f2db318fe31ffaf5793.png"
						className="w-[50px] rounded-full"
					/>
					<div className="ml-2">
						<h3 className="font-bold ">Tubeguruji</h3>
						<h3 className="text-gray-500">24 Sept 2024</h3>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IntroPost
