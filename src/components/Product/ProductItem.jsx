import { useNavigate } from 'react-router-dom'

const ProductItem = ({ data, id }) => {
	const navigate = useNavigate()
	return (
		<div
			className="shadow-xl rounded-lg dark:shadow-xl transition ease-in-out dark:shadow-gray-700 hover:scale-105 duration-150 cursor-pointer w-1/5 lg:w-full max-sm:w-full m-2 mb-5"
			onClick={() => navigate('/category/' + id)}
		>
			<div className="w-full h-[180px] bg-gray-300 mb-3 rounded-t-lg flex items-center md:h-[200px]">
				<img className="object-cocver w-full h-full rounded-t-lg" src={data.img} />
			</div>
			<div className="flex items-center flex-col">
				<span className="font-semibold text-sm block text-ellipsis whitespace-nowrap overflow-hidden md:font-medium mb-2">
					{data.title}
				</span>
				<span className="text-base">&#8377;{data.price}</span>
				<span className="text-base">&#8377;{data.price}</span>
			</div>
		</div>
	)
}

export default ProductItem
