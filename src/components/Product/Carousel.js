import { useState, useEffect } from 'react'

const Carousel = ({ children: slides, imgs, autoSlide = false, autoSlideInterval = 3000 }) => {
	const thumbnails = [...imgs]
	const [curr, setCurr] = useState(0)

	const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
	const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

	useEffect(() => {
		if (!autoSlide) return
		const slideInterval = setInterval(next, autoSlideInterval)
		return () => clearInterval(slideInterval)
	}, [])
	return (
		<div className="flex flex-col">
			<div className="overflow-hidden relative max-h-72 w-full md:max-h-full md:rounded-2xl">
				<div
					className="flex transition-transform ease-out duration-500"
					style={{ transform: `translateX(-${curr * 100}%)` }}
				>
					{slides}
				</div>
				<div className="absolute inset-0 flex items-center justify-between p-4">
					<button onClick={prev} className="bg-white rounded-full p-3 md:hidden">
						<img className="h-[10px] w-[10px]" src="./images/icon-previous.svg" alt="" />
					</button>
					<button onClick={next} className="bg-white rounded-full p-3 md:hidden">
						<img className="h-[10px] w-[10px]" src="./images/icon-next.svg" alt="" />
					</button>
				</div>
			</div>
			<div className="hidden md:flex w-full gap-8 mt-8 h-20">
				{thumbnails.map((t, i) => (
					<div
						key={i}
						onClick={() => setCurr(i)}
						className="hover:cursor-pointer focus:opacity-20 rounded-xl w-[100px] h-[100px]"
					>
						<div className={`rounded-xl ${curr === i && 'border-2 border-secondary'}`}>
							<img
								className={`rounded-xl w-[100px] h-[100px] ${curr === i && 'opacity-40'}`}
								src={t}
								alt=""
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Carousel
