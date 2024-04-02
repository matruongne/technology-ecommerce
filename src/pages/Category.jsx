import { useParams } from 'react-router-dom'
import Category2 from './../components/Category/Category2'
import Navbar from '../components/Navbar/Navbar'
import img1 from '../assets/Gadgets_Signup.png'
import Sidebar from '../components/Sidebar/Sidebar'

const Category = () => {
	const { category } = useParams()
	console.log(category)
	const title = 'Laptop'
	const data = [
		{
			id: 1,
			title: 'Category',
			price: 1000,
			img: img1,
		},
		{
			id: 2,
			title: 'Category',
			price: 1000,
			img: img1,
		},
		{
			id: 3,
			title: 'Category',
			price: 1000,
			img: img1,
		},
		{
			id: 4,
			title: 'Category',
			price: 1000,
			img: img1,
		},
		,
		{
			id: 4,
			title: 'Category',
			price: 1000,
			img: img1,
		},
		,
		{
			id: 4,
			title: 'Category',
			price: 1000,
			img: img1,
		},
	]
	return (
		<div>
			<Navbar />
			<div className="dark:bg-gray-800">
				<div className="flex container">
					<Sidebar>
						<Category2 data={data} title={title} />
					</Sidebar>
				</div>
			</div>
		</div>
	)
}

export default Category
