import React from 'react'
import Image1 from '../../assets/Heros/headphone.png'
import Image2 from '../../assets/Category/watch.png'
import Image3 from '../../assets/Category/macbook.png'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const Category = () => {
	const navigate = useNavigate()
	return (
		<div>
			<div className="py-8">
				<div className="container">
					<div className="grid grid-cols-9 gap-8">
						{/* first col */}
						<div className="sm:col-span-4 py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end">
							<div>
								<div className="mb-4">
									<p className="mb-[2px] text-gray-400">Enjoy</p>
									<p className="text-2xl font-semibold mb-[2px]">With</p>
									<p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">Headphone</p>
									<Button
										text="Browse"
										handler={() => navigate('/shops/?category=Phone')}
										classNames="py-2 px-8 rounded-full bg-primary text-white font-semibold"
									/>
								</div>
							</div>
							<img src={Image1} alt="" className="w-[220px] absolute bottom-12 -right-0" />
						</div>
						{/* second col */}
						<div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white rounded-3xl relative h-[320px] flex items-end">
							<div>
								<div className="mb-4">
									<p className="mb-[2px] text-white">Enjoy</p>
									<p className="text-2xl font-semibold mb-[2px]">With</p>
									<p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Gadget</p>
									<Button
										text="Browse"
										handler={() => navigate('/shops/?category=smartphones')}
										classNames="py-2 px-8 rounded-full bg-white text-brandYellow font-semibold"
									/>
								</div>
							</div>
							<img src={Image2} alt="" className="w-[320px] absolute -right-10 lg:top-[20px]" />
						</div>
						{/* third col */}
						<div className="sm:col-span-3 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
							<div>
								<div className="mb-4">
									<p className="mb-[2px] text-white">Enjoy</p>
									<p className="text-2xl font-semibold mb-[2px]">With</p>
									<p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Laptop</p>
									<Button
										text="Browse"
										handler={() => navigate('/shops/?category=laptops')}
										classNames="py-2 px-8 rounded-full bg-white text-primary font-semibold"
									/>
								</div>
							</div>
							<img
								src={Image3}
								alt=""
								className="w-[250px] absolute top-1/2 -translate-y-1/2 -right-5"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Category
