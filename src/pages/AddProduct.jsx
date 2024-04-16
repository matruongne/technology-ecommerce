import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getAllBrandAsync, selectAllBrands } from '../redux/Slices/Brand/brandSlice'
import { getAllCategoryAsync, selectAllCategories } from '../redux/Slices/Category/categorySlice'
import {
	clearSelectedProduct,
	createProductAsync,
	getProductByIdAsync,
	selectProductDetail,
	updateProductAsync,
} from '../redux/Slices/Product/productSlice'
import HeadlessModal from '../components/Modals/HeadlessModal'
import ImagetoBase64 from '../utils/ImagetoBase64'
import { BsFilePost } from 'react-icons/bs'
import { UploadImage } from '../components/Upload/UploadImage'

function AddProduct() {
	const [openModal, setOpenModal] = useState(false)
	const [modalData, setModalData] = useState({})

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [discountPercentage, setDiscountPercentage] = useState('')
	const [stock, setStock] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [colors, setColors] = useState([])
	const [thumbnail, setThumbnail] = useState('')
	const [image1, setImage1] = useState('')
	const [image2, setImage2] = useState('')
	const [image3, setImage3] = useState('')
	const [image4, setImage4] = useState('')
	const [highlight, setHighlight] = useState([])
	const brands = useSelector(selectAllBrands)
	const categories = useSelector(selectAllCategories)
	const selectedProduct = useSelector(selectProductDetail)

	const dispatch = useDispatch()
	const params = useParams()
	const naviagete = useNavigate()

	const colorsData = [
		{
			name: 'White',
			class: 'bg-white',
			selectedClass: 'ring-gray-400',
			id: 'white',
		},
		{
			name: 'Gray',
			class: 'bg-gray-200',
			selectedClass: 'ring-gray-400',
			id: 'gray',
		},
		{
			name: 'Black',
			class: 'bg-gray-900',
			selectedClass: 'ring-gray-900',
			id: 'black',
		},
	]

	useEffect(() => {
		if (params.id) {
			dispatch(getProductByIdAsync(params.id))
		} else {
			dispatch(clearSelectedProduct())
		}
		dispatch(getAllCategoryAsync())
		dispatch(getAllBrandAsync())
	}, [params.id, dispatch])

	useEffect(() => {
		if (selectedProduct && params.id) {
			setTitle(selectedProduct.title)
			setDescription(selectedProduct.description)
			setPrice(selectedProduct.price)
			setDiscountPercentage(selectedProduct.discountPercentage)
			setThumbnail(selectedProduct.thumbnail)
			setStock(selectedProduct.stock)
			setImage1(JSON.parse(selectedProduct.images)[0])
			setImage2(JSON.parse(selectedProduct.images)[1])
			setImage3(JSON.parse(selectedProduct.images)[2])
			setImage4(JSON.parse(selectedProduct.images)[3])
			setBrand(selectedProduct.brand)
			setCategory(selectedProduct.category)
			setHighlight(JSON.parse(selectedProduct.highlights))
			setColors(JSON.parse(selectedProduct.colors))
		}
	}, [
		selectedProduct,
		params.id,
		setTitle,
		setDescription,
		setPrice,
		setDiscountPercentage,
		setThumbnail,
		setStock,
		setImage1,
		setImage2,
		setImage3,
		setImage4,
		setBrand,
		setCategory,
		setHighlight,
		setColors,
	])

	const handleDelete = () => {
		const product = { ...selectedProduct }
		product.deleted = true
		dispatch(updateProductAsync(product))
	}
	const handleSubmit = async () => {
		let product = {}
		if (thumbnail && image1 && image2 && image3 && image4) {
			const result = await UploadImage(thumbnail)
			const result1 = await UploadImage(image1)
			const result2 = await UploadImage(image2)
			const result3 = await UploadImage(image3)
			const result4 = await UploadImage(image4)

			if (
				result.data.secure_url &&
				result1.data.secure_url &&
				result2.data.secure_url &&
				result3.data.secure_url &&
				result4.data.secure_url &&
				title !== '' &&
				description &&
				price &&
				discountPercentage &&
				stock &&
				brand &&
				category &&
				colors &&
				highlight
			)
				product = {
					title,
					description,
					price,
					discountPercentage,
					thumbnail: result.data.secure_url,
					quantity: stock,
					colors,
					highlights: [highlight],
					images: [
						result1.data.secure_url,
						result2.data.secure_url,
						result3.data.secure_url,
						result4.data.secure_url,
					],
					BrandId: brand,
					CategoryId: category,
				}
		} else toast.error('Error editing')
		console.log(product)
		dispatch(createProductAsync(product)).then(() => naviagete('/admin'))
	}

	const handleChangeImage = (e, set) => {
		e.preventDefault()
		const file = e.target.files?.[0]
		if (!file) {
			set('')
			return
		}
		if (!file.type.includes('image')) {
			set('')
			return alert('Please select an image file to display in the browser and try again')
		}

		ImagetoBase64(file).then((result) => {
			set(result)
		})
	}

	const handleColorChange = (event) => {
		const colorId = event.target.value
		const isChecked = event.target.checked

		let newSelectedColors = [...colors]

		if (isChecked) {
			const colorToAdd = colorsData.find((color) => color.id === colorId)
			if (colorToAdd) {
				newSelectedColors.push(colorToAdd)
			}
		} else {
			newSelectedColors = newSelectedColors.filter((color) => color.id !== colorId)
		}

		setColors(newSelectedColors)
	}

	return (
		<>
			<div className="container py-42 bg-white my-12">
				<div className=" space-y-12 bg-white p-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-2xl font-semibold leading-7 text-gray-900">Add Product</h2>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							{selectedProduct && selectedProduct.deleted && (
								<h2 className="text-red-500 sm:col-span-6">This product is deleted</h2>
							)}

							<div className="sm:col-span-6">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Product Name
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
										<input
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											id="title"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="description"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Description
								</label>
								<div className="mt-2">
									<textarea
										id="description"
										rows={3}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Write a few sentences about product.
								</p>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="brand"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Brand
								</label>
								<div className="mt-2">
									<select
										value={brand}
										onChange={(e) => {
											setBrand(e.target.value)
										}}
									>
										<option value="">--choose brand--</option>
										{brands.map((brand) => (
											<option key={brand.id} value={brand.id}>
												{brand.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="colors"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Colors
								</label>
								<div className="mt-2 flex flex-row items-center">
									{colorsData.map((color, index) => (
										<div key={color.id} className="mr-4">
											<input
												type="checkbox"
												key={color.id}
												value={color.id}
												checked={colors?.find((c) => c.id === color.id)}
												onChange={handleColorChange}
											/>{' '}
											{color.name}
										</div>
									))}
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="category"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Category
								</label>
								<div className="mt-2">
									<select value={category} onChange={(e) => setCategory(e.target.value)}>
										<option value="">--choose category--</option>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="price"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Price
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
										<input
											type="number"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											id="price"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="discountPercentage"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Discount Percentage
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
										<input
											type="number"
											value={discountPercentage}
											onChange={(e) => setDiscountPercentage(e.target.value)}
											id="discountPercentage"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="stock"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Stock
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
										<input
											type="number"
											value={stock}
											onChange={(e) => setStock(e.target.value)}
											id="stock"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>

							<div className="sm:col-span-6">
								<label
									htmlFor="thumbnail"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Thumbnail
								</label>
								<div className="flex items-center space-x-6">
									<div className="shrink-0">
										{thumbnail ? (
											<img
												id="preview_img"
												className="h-16 w-16 object-cover border border-primary rounded-lg"
												src={null || thumbnail}
												alt="Current profile photo"
											/>
										) : (
											<BsFilePost className="h-16 w-16 object-cover" />
										)}
									</div>
									<label className="block">
										<span className="sr-only">Choose profile photo</span>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => handleChangeImage(e, setThumbnail)}
											className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
										/>
									</label>
								</div>
							</div>

							<div className="sm:col-span-6">
								<label
									htmlFor="thumbnail"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Image 1
								</label>
								<div className="flex items-center space-x-6">
									<div className="shrink-0">
										{image1 ? (
											<img
												id="preview_img"
												className="h-16 w-16 object-cover border border-primary rounded-lg"
												src={null || image1}
												alt="Current profile photo"
											/>
										) : (
											<BsFilePost className="h-16 w-16 object-cover" />
										)}
									</div>
									<label className="block">
										<span className="sr-only">Choose profile photo</span>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => handleChangeImage(e, setImage1)}
											className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
										/>
									</label>
								</div>
							</div>
							<div className="sm:col-span-6">
								<label
									htmlFor="thumbnail"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Image 2
								</label>
								<div className="flex items-center space-x-6">
									<div className="shrink-0">
										{image2 ? (
											<img
												id="preview_img"
												className="h-16 w-16 object-cover border border-primary rounded-lg"
												src={null || image2}
												alt="Current profile photo"
											/>
										) : (
											<BsFilePost className="h-16 w-16 object-cover" />
										)}
									</div>
									<label className="block">
										<span className="sr-only">Choose profile photo</span>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => handleChangeImage(e, setImage2)}
											className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
										/>
									</label>
								</div>
							</div>
							<div className="sm:col-span-6">
								<label
									htmlFor="thumbnail"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Image 3
								</label>
								<div className="flex items-center space-x-6">
									<div className="shrink-0">
										{image3 ? (
											<img
												id="preview_img"
												className="h-16 w-16 object-cover border border-primary rounded-lg"
												src={null || image3}
												alt="Current profile photo"
											/>
										) : (
											<BsFilePost className="h-16 w-16 object-cover" />
										)}
									</div>
									<label className="block">
										<span className="sr-only">Choose profile photo</span>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => handleChangeImage(e, setImage3)}
											className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
										/>
									</label>
								</div>
							</div>
							<div className="sm:col-span-6">
								<label
									htmlFor="thumbnail"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Image 4
								</label>
								<div className="flex items-center space-x-6">
									<div className="shrink-0">
										{image4 ? (
											<img
												id="preview_img"
												className="h-16 w-16 object-cover border border-primary rounded-lg"
												src={null || image4}
												alt="Current profile photo"
											/>
										) : (
											<BsFilePost className="h-16 w-16 object-cover" />
										)}
									</div>
									<label className="block">
										<span className="sr-only">Choose profile photo</span>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => handleChangeImage(e, setImage4)}
											className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
										/>
									</label>
								</div>
							</div>

							<div className="sm:col-span-6">
								<label
									htmlFor="highlight1"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Highlight
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
										<input
											type="text"
											value={highlight}
											onChange={(e) => setHighlight(e.target.value)}
											id="highlight1"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" mt-6 flex items-center justify-end gap-x-6">
					<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
						Cancel
					</button>

					{selectedProduct && !selectedProduct.deleted && (
						<button
							onClick={(e) => {
								e.preventDefault()
								setOpenModal(true)
								setModalData({
									title: 'Delete product',
									subtitle: 'Are you sure you want to delete this Product ?',
									btnTitle: 'Delete',
									classNames: 'sm:max-w-[300px]',
								})
							}}
							className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Delete
						</button>
					)}

					<button
						type="submit"
						onClick={() => handleSubmit()}
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
				</div>
			</div>
			<>
				{selectedProduct && (
					<HeadlessModal
						{...modalData}
						open={openModal}
						setOpen={setOpenModal}
						handle={handleDelete}
					></HeadlessModal>
				)}
			</>
		</>
	)
}

export default AddProduct
