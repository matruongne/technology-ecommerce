import Category2 from './../components/Category/Category2'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { selectAllProducts, selectTotalItems } from '../redux/Slices/Product/productSlice'
import { useEffect, useState } from 'react'
import { ITEMS_PER_PAGE } from '../data/constants'
import { getProductsByFiltersAsync } from './../redux/Slices/Product/productSlice'

const Category = () => {
	const [filter, setFilter] = useState({})
	const [sort, setSort] = useState({})
	const [page, setPage] = useState(1)
	const products = useSelector(selectAllProducts)
	const totalItems = useSelector(selectTotalItems)
	const userInfo = useSelector(selectUserInfo)

	const dispatch = useDispatch()

	useEffect(() => {
		setPage(1)
	}, [sort])

	useEffect(() => {
		const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
		dispatch(getProductsByFiltersAsync({ filter, sort, pagination }))
	}, [dispatch, filter, sort, page])

	return (
		<div>
			{userInfo && (
				<>
					<Navbar userInfo={userInfo} />
					<div className="dark:bg-gray-800">
						<div className="flex container">
							<Sidebar
								totalItems={totalItems}
								filter={filter}
								setFilter={setFilter}
								sort={sort}
								setSort={setSort}
								page={page}
								setPage={setPage}
							>
								<Category2 data={products} />
							</Sidebar>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Category
