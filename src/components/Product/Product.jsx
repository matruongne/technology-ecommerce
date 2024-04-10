import ProductItem from './ProductItem'

const Product = ({ products }) => {
	return (
		<div className="grid grid-cols-4">
			<div className="col-span-4 grid grid-cols-3 gap-6">
				{products?.map((item) => (
					<ProductItem key={item.id} id={item.id} data={item} />
				))}
			</div>
		</div>
	)
}

export default Product
