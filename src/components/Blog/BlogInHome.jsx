// import images
import Img1 from '../../assets/Category/macbook.png'
import Img2 from '../../assets/Category/macbook.png'
import Img3 from '../../assets/Category/macbook.png'

const BlogData = [
	{
		title: 'How to choose perfect smartwatch',
		subtitle:
			'minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?',
		published: 'Jan 20, 2024 by Dilshad',
		image: Img1,
		aosDelay: '0',
	},
	{
		title: 'How to choose perfect gadget',
		subtitle:
			'minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?',
		published: 'Jan 20, 2024 by Satya',
		image: Img2,
		aosDelay: '200',
	},
	{
		title: 'How to choose perfect VR headset',
		subtitle:
			'minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?',
		published: 'Jan 20, 2024 by Sabir',
		image: Img3,
		aosDelay: '400',
	},
]
const Blog = () => {
	return (
		<div className="my-12">
			<div className="container">
				{/* Header section */}
				<div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
					<h1 className="text-3xl font-bold lg:text-4xl">Recent News</h1>
					<p className="text-xs text-gray-400">Explore Our Blogs</p>
				</div>

				{/* Blog section */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
					{/* Blog card */}
					{BlogData.map((data) => (
						<div
							data-aos="fade-up"
							data-aos-delay={data.aosDelay}
							key={data.title}
							className="bg-white dark:bg-gray-900"
						>
							{/* image section */}
							<div className="overflow-hidden rounded-2xl mb-2">
								<img
									src={data.image}
									alt=""
									className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
								/>
							</div>
							{/* content section */}
							<div className="space-y-2">
								<p className="text-xs text-gray-500">{data.published}</p>
								<p className="font-bold line-clamp-1">{data.title}</p>
								<p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
									{data.subtitle}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Blog
