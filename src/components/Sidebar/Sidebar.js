import { Disclosure, Menu, Transition } from '@headlessui/react'
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci'
import { Fragment, useEffect } from 'react'
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { IoFunnelOutline } from 'react-icons/io5'

import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryAsync, selectAllCategories } from '../../redux/Slices/Category/categorySlice'
import { getAllBrandAsync } from '../../redux/Slices/Brand/brandSlice'
import { ITEMS_PER_PAGE } from '../../data/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectAllBrands } from '../../redux/Slices/Brand/brandSlice'

const sortOptions = [
	{ name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
	{ name: 'Price: Low to High', sort: 'discountPrice', order: 'asc', current: false },
	{ name: 'Price: High to Low', sort: 'discountPrice', order: 'desc', current: false },
]

const Sidebar = ({ totalItems, children, filter, setFilter, sort, setSort, page, setPage }) => {
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

	const categories = useSelector(selectAllCategories)
	const brands = useSelector(selectAllBrands)
	const filters = [
		{
			id: 'category',
			name: 'Category',
			options: categories,
		},
		{
			id: 'brand',
			name: 'Brands',
			options: brands,
		},
	]

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		dispatch(getAllCategoryAsync())
		dispatch(getAllBrandAsync())
	}, [dispatch])

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search)
		const params = {}

		for (const [key, value] of searchParams.entries()) {
			if (!params[key]) {
				params[key] = [value]
			} else {
				params[key].push(value)
			}
		}

		setFilter(params)
	}, [location.search])

	const handleFilter = (e, section, option) => {
		const newFilter = { ...filter }
		if (e.target.checked) {
			if (newFilter[section.id]) {
				newFilter[section.id].push(option.value)
			} else {
				newFilter[section.id] = [option.value]
			}
		} else {
			const index = newFilter[section.id].findIndex((el) => el === option.value)
			newFilter[section.id].splice(index, 1)
		}

		const searchParams = new URLSearchParams()

		for (const key in newFilter) {
			if (Array.isArray(newFilter[key])) {
				newFilter[key].forEach((value) => {
					searchParams.append(key, value)
				})
			} else {
				searchParams.append(key, newFilter[key])
			}
		}

		const currentUrl = new URL(window.location.href)
		currentUrl.search = searchParams.toString()

		navigate(currentUrl.pathname + currentUrl.search)

		setFilter(newFilter)
	}

	const handleSort = (e, option) => {
		const sort = { _sort: option.sort, _order: option.order }
		setSort(sort)
	}

	const handlePage = (page) => {
		setPage(page)
	}

	const isFilterMatch = (filter, filters) => {
		for (const key in filter) {
			const filterValues = filter[key]
			const filterOptions = filters.section.id === key
			if (filterOptions) {
				for (const value of filterValues) {
					if (filters.option.value === value) {
						return true
					}
				}
			}
		}
		return false
	}

	return (
		<div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
			<div>
				<main className="mx-auto w-full">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
							All Products
						</h1>

						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button className="cursor-pointer group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900">
										Sort
										<FaChevronDown
											className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="cursor-pointer absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-600 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="">
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<p
															onClick={(e) => handleSort(e, option)}
															className={classNames(
																option.current
																	? 'font-medium text-gray-900'
																	: 'text-gray-500 hover:text-gray-100 dark:text-white',
																active ? 'bg-secondary text-gray-100' : '',
																'block px-4 py-2 text-sm font-normal last:rounded-b-md  first:rounded-t-md'
															)}
														>
															{option.name}
														</p>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
							{/* MobileFilterButton */}
							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => {}}
							>
								<span className="sr-only">Filters</span>
								<IoFunnelOutline className="h-5 w-5" aria-hidden="true" />
							</button>
							{/* End MobileFilterButton */}
						</div>
					</div>
					<section aria-labelledby="products-heading" className="pb-24 pt-6">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
							<form className="hidden lg:block">
								{filters.map((section) => (
									<Disclosure
										as="div"
										key={section.id}
										className="border-b dark:bg-gray-800 border-gray-200 py-6"
									>
										{({ open }) => (
											<>
												<h3 className="-my-3 flow-root">
													<Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 dark:text-gray-100 hover:text-gray-500">
														<span className="font-semibold text-base text-gray-900 dark:text-gray-100">
															{section.name}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<CiCircleMinus className="h-5 w-5" aria-hidden="true" />
															) : (
																<CiCirclePlus className="h-5 w-5" aria-hidden="true" />
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-4">
														{section.options.map((option, optionIdx) => (
															<div key={option.value} className="flex items-center">
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type="checkbox"
																	defaultChecked={isFilterMatch(filter, { option, section })}
																	onChange={(e) => handleFilter(e, section, option)}
																	className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className="ml-3 text-sm text-gray-600 dark:text-gray-100"
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>
							{/* Product grid */}
							{children}
							{/* Product grid end */}
						</div>
					</section>
					{/* section of product and filters ends */}
					<div className="flex items-center justify-between border-t border-gray-200 bg-white my-6 px-4 py-3 sm:px-6">
						<div className="flex flex-1 justify-between sm:hidden">
							<div
								onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
								className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
							>
								Previous
							</div>
							<div
								onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
								className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
							>
								Next
							</div>
						</div>
						<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
							<div>
								<p className="text-sm text-gray-700">
									Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
									<span className="font-medium">
										{page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE}
									</span>{' '}
									of <span className="font-medium">{totalItems}</span> results
								</p>
							</div>
							<div>
								<nav
									className="isolate inline-flex -space-x-px rounded-md shadow-sm"
									aria-label="Pagination"
								>
									<div
										onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
										className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
									>
										<span className="sr-only">Previous</span>
										<FaChevronLeft className="h-5 w-5" aria-hidden="true" />
									</div>
									{/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

									{Array.from({ length: totalPages }).map((el, index) => (
										<div
											key={index}
											onClick={(e) => handlePage(index + 1)}
											aria-current="page"
											className={`relative cursor-pointer z-10 inline-flex items-center ${
												index + 1 === page ? 'bg-primary text-white' : 'text-gray-400'
											} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
										>
											{index + 1}
										</div>
									))}

									<div
										onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
										className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
									>
										<span className="sr-only">Next</span>
										<FaChevronRight className="h-5 w-5" aria-hidden="true" />
									</div>
								</nav>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Sidebar
