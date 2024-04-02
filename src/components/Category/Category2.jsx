import Product from '../Product/Product'

const Category2 = ({ data, title }) => {
	return (
		<div className="col-span-4">
			{/* <div className="text-2xl font-semibold uppercase py-8">{title}</div> */}
			<Product innerPage={true} products={data} />
		</div>
	)
}

export default Category2
