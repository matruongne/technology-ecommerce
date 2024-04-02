import React from 'react'
import Carousel from './Carousel'

export const ImageGallery = ({ product }) => {
	const imgs = [...product.images]
	return (
		<div className="relative md:w-full md:max-w-[500px]">
			<Carousel imgs={imgs}>
				{imgs.map((img) => (
					<img className="w-[500px] h-[500px]" key={img} src={img} />
				))}
			</Carousel>
		</div>
	)
}
