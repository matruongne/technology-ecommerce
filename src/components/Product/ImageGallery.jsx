import React from 'react'
import Carousel from './Carousel'

export const ImageGallery = ({ product }) => {
	const imgs = [...JSON.parse(product.images)]

	return (
		<div className="relative md:w-full md:max-w-[500px]">
			<Carousel imgs={imgs}>
				{imgs.map((img, index) => (
					<img className="w-[500px] h-[500px]" key={index} src={img} />
				))}
			</Carousel>
		</div>
	)
}
