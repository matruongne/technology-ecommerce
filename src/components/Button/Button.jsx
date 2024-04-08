const Button = ({ text, classNames, bgColor, textColor, handler = () => {} }) => {
	return (
		<button
			onClick={handler}
			className={'cursor-pointer hover:scale-105 duration-300 relative z-10 ' + classNames}
		>
			{text}
		</button>
	)
}

export default Button
