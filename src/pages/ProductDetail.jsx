import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './../components/Navbar/Navbar'

import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { ImageGallery } from '../components/Product/ImageGallery'
import { FaStar } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { getProductByIdAsync } from '../redux/Slices/Product/productSlice'
import { selectProductDetail } from '../redux/Slices/Product/productSlice'
import {
	addToCartAsync,
	getCartByUserAsync,
	selectAllCarts,
	updateCartAsync,
} from '../redux/Slices/Cart/cartSlice'

const ProductDetail = () => {
	const { productId } = useParams()

	const userInfo = useSelector(selectUserInfo)
	const product = useSelector(selectProductDetail)
	const carts = useSelector(selectAllCarts)
	const dispatch = useDispatch()

	const [selectedColor, setSelectedColor] = useState()
	const [quantity, setQuantity] = useState(1)

	const handleCart = (e) => {
		e.preventDefault()

		if (!selectedColor) {
			toast.error('Select a color!')
			return
		} else if (carts?.findIndex((item) => item.Product.id === product.id) < 0) {
			const newItem = {
				ProductId: product.id,
				quantity: quantity,
			}
			if (selectedColor) {
				newItem.colors = selectedColor
			}

			dispatch(addToCartAsync(newItem))
		} else if (
			carts.filter(function (cart) {
				return cart.Product.id === product.id && JSON.parse(cart.colors).name === selectedColor.name
			}).length > 0
		) {
			const cartUpdate = carts.find(function (cart) {
				return cart.Product.id === product.id && JSON.parse(cart.colors).name === selectedColor.name
			})

			const updateItem = {
				cartId: cartUpdate.id,
				quantity: quantity,
			}

			dispatch(updateCartAsync(updateItem))
		} else {
			const newItem = {
				ProductId: product.id,
				quantity: quantity,
			}

			if (selectedColor) {
				newItem.colors = selectedColor
			}

			dispatch(addToCartAsync(newItem))
		}
	}

	useEffect(() => {
		dispatch(getProductByIdAsync(productId))
		dispatch(getCartByUserAsync())
	}, [dispatch, productId])

	return (
		<div className="dark:bg-gray-700">
			<Navbar userInfo={userInfo} />
			<div className="bg-white dark:bg-gray-700 container">
				{product && (
					<div className="pt-6 block">
						<nav aria-label="Breadcrumb">
							<ol className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl pb-6">
								<li className="text-sm">
									<Link
										to={'/shops'}
										className="text-base font-bold cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
									>
										Shops
									</Link>
								</li>
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
								<li className="text-sm">
									<div className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500">
										{product.title}
									</div>
								</li>
							</ol>
						</nav>

						<div className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16 bg-gradient-to-br from-primary/10 to-primary/15 text-white rounded-3xl">
							{/* Image gallery */}
							<ImageGallery product={product} />
							{/* Product info */}
							<div className="mt-4 lg:mt-0 flex flex-col w-full h-[630px] justify-between items-start">
								<div>
									<div className="lg:col-span-2">
										<h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 pb-12">
											{product.title}
										</h1>
									</div>
									<div className="ml-6">
										<h2 className="sr-only">Product information</h2>
										<p className="text-xl line-through tracking-tight text-gray-500">
											${product.price}
										</p>
										<p className="text-3xl tracking-tight font-bold text-primary dark:text-gray-100">
											${product.discountPrice}
										</p>

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

										<div className="mt-10">
											{/* Colors */}
											{JSON.parse(product.colors) && JSON.parse(product.colors).length > 0 && (
												<div>
													<h3 className="-ml-6 text-xl font-medium text-gray-900">Color</h3>

													<RadioGroup
														value={selectedColor}
														onChange={setSelectedColor}
														className="mt-4"
													>
														<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
														<div className="flex items-center space-x-3">
															{JSON.parse(product?.colors).map((color) => (
																<RadioGroup.Option
																	key={color.name}
																	value={color}
																	className={({ active }) =>
																		classNames(
																			color.selectedClass,
																			active ? 'ring ring-offset-0 ring-primary' : '',
																			!active ? 'ring-1 ring-secondary' : '',
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
																			'h-9 w-9 rounded-full border border-black border-opacity-10'
																		)}
																	/>
																</RadioGroup.Option>
															))}
														</div>
													</RadioGroup>
												</div>
											)}

											<div className="mt-10 flex flex-col w-full">
												<h3 className="text-xl -ml-6 font-medium text-gray-900 mb-4">Quantity</h3>

												<div className="flex items-start justify-center">
													<button
														className="bg-secondary hover:bg-primary/90 py-2 px-5 rounded-l-lg font-bold text-white text-3xl"
														onClick={() => setQuantity((prev) => prev - 1)}
													>
														-
													</button>
													<span className="pt-2 pb-[3px] px-5 text-2xl leading-relaxed h-full text-primary border border-primary">
														{quantity}
													</span>
													<button
														className="bg-secondary hover:bg-primary/90 py-2 px-4 rounded-r-lg font-bold text-white text-3xl"
														onClick={() => setQuantity((prev) => prev + 1)}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<button
									onClick={handleCart}
									type="submit"
									className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-secondary px-8 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Add to Cart
								</button>
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

							{JSON.parse(product.highlights) && (
								<div className="mt-10">
									<h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
										Highlights
									</h3>

									<div className="mt-4">
										<ul className="list-disc space-y-2 pl-4 text-base">
											{JSON.parse(product?.highlights)?.map((highlight, index) => (
												<li key={index} className="text-gray-400">
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
