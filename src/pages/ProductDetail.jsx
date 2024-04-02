import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './../components/Navbar/Navbar'

import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { ImageGallery } from '../components/Product/ImageGallery'
import { FaStar } from 'react-icons/fa6'

const ProductDetail = () => {
	const { productId } = useParams()
	const [selectedColor, setSelectedColor] = useState()
	const [selectedSize, setSelectedSize] = useState()

	const items = null

	const product = {
		breadcrumbs: [
			{
				id: 1,
				href: 'https://th.bing.com/th/id/OIP.roSLmSCumFuVrpHC93xfsgHaE7?rs=1&pid=ImgDetMain',
				name: 'breadcrumbName1',
			},
			{
				id: 2,
				href: 'https://th.bing.com/th/id/OIP.roSLmSCumFuVrpHC93xfsgHaE7?rs=1&pid=ImgDetMain',
				name: 'breadcrumbName2',
			},
		],
		href: 'https://th.bing.com/th/id/OIP.hcq8PCaLp0QPlahvELvyPgHaHa?rs=1&pid=ImgDetMain',
		title: 'ProductTitle',
		price: 12000,
		discountPrice: 10000,
		rating: 3,
		images: [
			'https://th.bing.com/th/id/OIP.hcq8PCaLp0QPlahvELvyPgHaHa?rs=1&pid=ImgDetMain',
			'https://th.bing.com/th/id/OIP.SRLVObsW-GoAaTluSXGG_wHaE8?rs=1&pid=ImgDetMain',
			'https://th.bing.com/th/id/OIP.cz2WiN3orpiwf7TwPHybhQHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
			'https://th.bing.com/th/id/OIP.tHKBFuHyn7-j-wU3s6cxKgAAAA?w=350&h=350&rs=1&pid=ImgDetMain',
		],
		description: 'ProductDescription',
		highlights: ['highlight1', 'highlight2', 'highlight3'],
	}
	const status = ''

	const handleCart = (e) => {
		e.preventDefault()
		if (items.findIndex((item) => item.product.id === product.id) < 0) {
			console.log({ items, product })
			const newItem = {
				product: product.id,
				quantity: 1,
			}
			if (selectedColor) {
				newItem.color = selectedColor
			}
			if (selectedSize) {
				newItem.size = selectedSize
			}
			// dispatch(addToCartAsync({ item: newItem, alert }))
		} else {
			toast.error('Item Already added')
		}
	}

	useEffect(() => {}, [productId])

	return (
		<div className="dark:bg-gray-700">
			<Navbar />
			<div className="bg-white dark:bg-gray-700 container">
				{status === 'loading' ? 'Loading' : null}
				{product && (
					<div className="pt-6">
						<nav aria-label="Breadcrumb">
							<ol className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl pb-6">
								{product.breadcrumbs &&
									product.breadcrumbs.map((breadcrumb) => (
										<li key={breadcrumb.id}>
											<div className="flex items-center">
												<a
													href={breadcrumb.href}
													className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100"
												>
													{breadcrumb.name}
												</a>
												<svg
													width={20}
													height={20}
													viewBox="0 0 16 20"
													fill="currentColor"
													aria-hidden="true"
													className="h-5 w-4 text-secondary"
												>
													<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
												</svg>
											</div>
										</li>
									))}
								<li className="text-sm">
									<a
										href={product.href}
										aria-current="page"
										className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
									>
										{product.title}
									</a>
								</li>
							</ol>
						</nav>

						<div className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16 bg-gradient-to-br from-gray-400/90 to-gray-100 text-white rounded-3xl">
							{/* Image gallery */}
							<ImageGallery product={product} />

							{/* Product info */}
							<div className="flex flex-col w-full items-center">
								<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
									<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl pb-12">
										{product.title}
									</h1>
								</div>

								{/* Options */}
								<div className="mt-4 lg:row-span-3 lg:mt-0">
									<h2 className="sr-only">Product information</h2>
									<p className="text-xl line-through tracking-tight text-gray-900">
										${product.price}
									</p>
									<p className="text-3xl tracking-tight text-gray-900">${product.discountPrice}</p>

									{/* Reviews */}
									<div className="mt-6">
										<h3 className="sr-only">Reviews</h3>
										<div className="flex items-center">
											<div className="flex items-center">
												{[0, 1, 2, 3, 4].map((rating) => (
													<FaStar
														key={rating}
														className={classNames(
															product.rating > rating ? 'text-yellow-500' : 'text-gray-400',
															'h-5 w-5 flex-shrink-0'
														)}
														aria-hidden="true"
													/>
												))}
											</div>
											<p className="sr-only">{product.rating} out of 5 stars</p>
										</div>
									</div>

									<form className="mt-10">
										{/* Colors */}
										{product.colors && product.colors.length > 0 && (
											<div>
												<h3 className="text-sm font-medium text-gray-900">Color</h3>

												<RadioGroup
													value={selectedColor}
													onChange={setSelectedColor}
													className="mt-4"
												>
													<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
													<div className="flex items-center space-x-3">
														{product.colors.map((color) => (
															<RadioGroup.Option
																key={color.name}
																value={color}
																className={({ active, checked }) =>
																	classNames(
																		color.selectedClass,
																		active && checked ? 'ring ring-offset-1' : '',
																		!active && checked ? 'ring-2' : '',
																		'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
																	)
																}
															>
																<RadioGroup.Label as="span" className="sr-only">
																	{color.name}
																</RadioGroup.Label>
																<span
																	aria-hidden="true"
																	className={classNames(
																		color.class,
																		'h-8 w-8 rounded-full border border-black border-opacity-10'
																	)}
																/>
															</RadioGroup.Option>
														))}
													</div>
												</RadioGroup>
											</div>
										)}

										{/* Sizes */}
										{product.sizes && product.sizes.length > 0 && (
											<div className="mt-10">
												<div className="flex items-center justify-between">
													<h3 className="text-sm font-medium text-gray-900">Size</h3>
													<a
														href="#"
														className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
													>
														Size guide
													</a>
												</div>

												<RadioGroup
													value={selectedSize}
													onChange={setSelectedSize}
													className="mt-4"
												>
													<RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
													<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
														{product.sizes.map((size) => (
															<RadioGroup.Option
																key={size.name}
																value={size}
																disabled={!size.inStock}
																className={({ active }) =>
																	classNames(
																		size.inStock
																			? 'cursor-pointer bg-white text-gray-900 shadow-sm'
																			: 'cursor-not-allowed bg-gray-50 text-gray-200',
																		active ? 'ring-2 ring-indigo-500' : '',
																		'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
																	)
																}
															>
																{({ active, checked }) => (
																	<>
																		<RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
																		{size.inStock ? (
																			<span
																				className={classNames(
																					active ? 'border' : 'border-2',
																					checked ? 'border-indigo-500' : 'border-transparent',
																					'pointer-events-none absolute -inset-px rounded-md'
																				)}
																				aria-hidden="true"
																			/>
																		) : (
																			<span
																				aria-hidden="true"
																				className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
																			>
																				<svg
																					className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
																					viewBox="0 0 100 100"
																					preserveAspectRatio="none"
																					stroke="currentColor"
																				>
																					<line
																						x1={0}
																						y1={100}
																						x2={100}
																						y2={0}
																						vectorEffect="non-scaling-stroke"
																					/>
																				</svg>
																			</span>
																		)}
																	</>
																)}
															</RadioGroup.Option>
														))}
													</div>
												</RadioGroup>
											</div>
										)}

										<button
											onClick={handleCart}
											type="submit"
											className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Add to Cart
										</button>
									</form>
								</div>
							</div>
						</div>
						<div className="pt-6">
							{/* Description and details */}
							<div>
								<h3 className="sr-only">Description</h3>

								<div className="space-y-6">
									<p className="text-2xl font-medium text-gray-900 dark:text-gray-100">
										{product.description}
									</p>
								</div>
							</div>

							{product.highlights && (
								<div className="mt-10">
									<h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
										Highlights
									</h3>

									<div className="mt-4">
										<ul role="list" className="list-disc space-y-2 pl-4 text-base">
											{product.highlights.map((highlight) => (
												<li key={highlight} className="text-gray-400">
													<span className="text-gray-600 dark:text-gray-300">{highlight}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							)}

							<div className="mt-10">
								<h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">Details</h2>

								<div className="mt-4 space-y-6">
									<p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductDetail
