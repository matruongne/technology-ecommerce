import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import { GiTechnoHeart } from 'react-icons/gi'
import classNames from 'classnames'
import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCartByUserAsync,
	selectAllCarts,
	updateCartAsync,
} from '../../redux/Slices/Cart/cartSlice'
import { addToCartAsync } from './../../redux/Slices/Cart/cartSlice'
import { useEffect, useState } from 'react'
import HeadlessModal from '../Modals/HeadlessModal'
import { RadioGroup } from '@headlessui/react'
import toast from 'react-hot-toast'

const ProductItem = ({ data, id }) => {
	const navigate = useNavigate()

	const carts = useSelector(selectAllCarts)
	const dispatch = useDispatch()

	const [selectedColor, setSelectedColor] = useState()
	const [quantity, setQuantity] = useState(1)

	const [open, setOpen] = useState(false)
	const [modalData, setModalData] = useState({})

	const handleCart = (e) => {
		e.preventDefault()

		if (!selectedColor) {
			toast.error('Select a color!')
			return
		} else if (carts?.findIndex((item) => item.Product.id === id) < 0) {
			const newItem = {
				ProductId: id,
				quantity: quantity,
			}
			if (selectedColor) {
				newItem.colors = selectedColor
			}

			dispatch(addToCartAsync(newItem)).then(() => setOpen(false))
		} else if (
			carts.filter(function (cart) {
				return cart.Product.id === id && JSON.parse(cart.colors).name === selectedColor.name
			}).length > 0
		) {
			const cartUpdate = carts.find(function (cart) {
				return cart.Product.id === id && JSON.parse(cart.colors).name === selectedColor.name
			})

			const updateItem = {
				cartId: cartUpdate.id,
				quantity: quantity,
			}

			dispatch(updateCartAsync(updateItem)).then(() => setOpen(false))
		} else {
			const newItem = {
				ProductId: id,
				quantity: quantity,
			}

			if (selectedColor) {
				newItem.colors = selectedColor
			}

			dispatch(addToCartAsync(newItem)).then(() => setOpen(false))
		}
	}

	useEffect(() => {
		dispatch(getCartByUserAsync())
	}, [dispatch])
	return (
		<>
			<div
				className="shadow-xl rounded-lg transition ease-in-out dark:shadow-gray-700 dark:bg-gray-700 hover:scale-105 duration-150 cursor-pointer w-1/5 lg:w-full max-sm:w-full m-2 mb-5"
				onClick={() => navigate('/category/' + id)}
			>
				<div className="group rounded-lg relative border-solid border dark:border-gray-200">
					<div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
						{data.thumbnail ? (
							<img
								src={data.thumbnail}
								alt={data.title}
								className="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						) : (
							<GiTechnoHeart className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
						)}
					</div>
					<div className="m-4 flex justify-between">
						<div className="flex flex-col w-full">
							<h3 className="text-xl text-gray-700 dark:text-gray-100 mb-3 font-bold">
								<div className="line-clamp-1">{data.title}</div>
							</h3>
							<div>
								<p className="text-base block font-bold text-primary">${data.discountPrice}</p>
								<p className="text-sm block line-through font-medium text-gray-400 mt-1">
									${data.price}
								</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="mt-2 text-sm text-gray-500 flex items-center">
									{[0, 1, 2, 3, 4].map((rating) => (
										<FaStar
											key={rating}
											className={classNames(
												data.rating > rating
													? 'text-yellow-500'
													: 'text-gray-400 dark:text-gray-100',
												'h-4 w-4 flex-shrink-0'
											)}
											aria-hidden="true"
										/>
									))}
								</p>

								<MdAddShoppingCart
									onClick={(e) => {
										e.stopPropagation()
										setOpen(!open)
										setModalData({
											title: 'Add a quantity and color to your shopping',
											subtitle:
												'Enhance Your Shopping Experience: Specify Quantity and Color for Your Items!',
											btnTitle: <MdAddShoppingCart className="text-xl" />,
											classNames: 'sm:max-w-lg',
										})
									}}
									className="w-8 h-8 mt-2 text-2xl text-secondary hover:text-primary"
								/>
							</div>
						</div>
					</div>
					{data.deleted && (
						<div>
							<p className="text-sm text-red-400">data deleted</p>
						</div>
					)}
					{data.stock <= 0 && (
						<div>
							<p className="text-sm text-red-400">out of stock</p>
						</div>
					)}
				</div>
			</div>
			<HeadlessModal {...modalData} open={open} setOpen={setOpen} handle={handleCart}>
				<div className="w-full flex items-start justify-center flex-col">
					<div className="flex justify-between items-center w-full">
						<div className="mb-6 flex flex-col  ml-8">
							<h3 className="text-2xl text-gray-700 dark:text-gray-100 mb-3 font-bold">
								<div className="line-clamp-1">{data.title}</div>
							</h3>
							<div className="ml-4">
								<p className="text-base block font-bold text-primary">${data.discountPrice}</p>
								<p className="text-sm block line-through font-medium text-gray-400 mt-1">
									${data.price}
								</p>
							</div>
						</div>
						<div className="mr-8 border border-primary rounded-lg">
							{data.thumbnail ? (
								<img
									src={data.thumbnail}
									alt={data.title}
									className="h-[100px] w-[100px] rounded-lg object-cover object-center"
								/>
							) : (
								<GiTechnoHeart className="h-[100px] w-[100px] object-cover object-center" />
							)}
						</div>
					</div>

					{JSON.parse(data.colors) && JSON.parse(data.colors).length > 0 && (
						<div className="w-full">
							<h3 className="text-lg font-medium text-gray-900">Color</h3>

							<RadioGroup
								value={selectedColor}
								onChange={setSelectedColor}
								className="mt-2 flex justify-center items-center"
							>
								<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
								<div className="flex items-center space-x-3">
									{JSON.parse(data?.colors).map((color) => (
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
													'h-8 w-8 rounded-full border border-black border-opacity-10'
												)}
											/>
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>
					)}
					<div className="mt-2 flex flex-col w-full">
						<h3 className="text-xl font-medium text-gray-900 mb-2">Quantity</h3>

						<div className="flex items-start justify-center">
							<button
								className="bg-secondary hover:bg-primary/90 py-1 px-4 rounded-lg font-bold text-white text-3xl"
								onClick={() => setQuantity((prev) => prev - 1)}
							>
								-
							</button>
							<span className="py-2 px-6 rounded-lg text-2xl text-primary">{quantity}</span>
							<button
								className="bg-secondary hover:bg-primary/90 py-1 px-3 rounded-lg font-bold text-white text-3xl"
								onClick={() => setQuantity((prev) => prev + 1)}
							>
								+
							</button>
						</div>
					</div>
				</div>
			</HeadlessModal>
		</>
	)
}

export default ProductItem
