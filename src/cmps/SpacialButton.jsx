export function SpecialButton({ text, size, isActive, onClick = () => {}, args }) {
	return (
		<div
			onClick={() => onClick(args)}
			style={size && (isActive ? { width: 120 + "px", height: size.height } : { width: size.width, height: size.height })}
			className={"btn-container " + (isActive && "active-mode")}>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='cell'></div>
			<div className='content'>
				<button className='action-btn'>
					<span style={size && { transform: "translate(0,0)" }}>
						{text}
						{isActive && "Search"}
					</span>
				</button>
			</div>
		</div>
	);
}
