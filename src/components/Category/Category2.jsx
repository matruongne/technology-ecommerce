import Product from '../Product/Product'

const Category2 = ({ data }) => {
	return (
		<div className="col-span-4">
			<Product products={data} />
		</div>
	)
}

export default Category2
