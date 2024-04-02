import React from 'react'
import { useNavigate } from 'react-router-dom'

function Blogs({ posts }) {
	const navigate = useNavigate()
	const delay = 200
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map((item, index) => (
				<div
					key={item.id}
					className="cursor-pointer bg-gray-200 rounded-2xl"
					data-aos="fade-up"
					data-aos-delay={delay + index * 100}
					onClick={() => navigate('/blog/' + item.id)}
				>
					<img src={item.coverImage} className="w-full rounded-2xl object-cover h-[200px]" />
					<div className="m-5">
						<h3 className="text-red-500 mt-3">{item.tag}</h3>
						<h3 className="font-bold mt-3">{item.title}</h3>
						<h3 className="line-clamp-3 text-gray-400 mt-3">{item.desc}</h3>
						<div className="flex items-center mt-5">
							<img
								src="https://courses.tubeguruji.com/static/media/logo.8f2db318fe31ffaf5793.png"
								className="w-[35px] rounded-full"
							/>
							<div className="ml-2">
								<h3 className="font-bold text-[12px]">Tubeguruji</h3>
								<h3 className="text-gray-500 text-[10px]">24 Sept 2024</h3>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Blogs
