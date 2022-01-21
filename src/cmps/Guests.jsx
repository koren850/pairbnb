import React, { useEffect, useState } from "react";

import plus from "../styles/svg/plus.svg";
import minus from "../styles/svg/minus.svg";

export function Guests({ init, set }) {
	const order = init;

	function handleChange(type, diff) {
		if (type === "adults" && order[type] + diff < 1) return;
		if (order[type] + diff < 0) return;
		set({ ...order, guestsCount: order.guestsCount + diff, [type]: order[type] + diff });
	}

	function stop(ev) {
		ev.stopPropagation();
	}

	const minusSvg = <img className='plus-minus' src={minus} />;
	const plusSvg = <img className='plus-minus' src={plus} />;
	return (
		<div onClick={stop} className='guests-checkout'>
			<div className='guest-add flex'>
				<div className='guest-type'>
					<h3>Adults</h3>
					<div>
						<button style={order.adults < 2 ? { opacity: "0.2", cursor: "not-allowed" } : {}} onClick={() => handleChange("adults", -1)}>
							{minusSvg}
						</button>
						<span style={{ color: "black" }}>{order.adults}</span>
						<button onClick={() => handleChange("adults", 1)}>{plusSvg}</button>
					</div>
				</div>
				<div className='guest-type'>
					<h3>Children</h3>
					<div>
						<button style={order.children < 1 ? { opacity: "0.2", cursor: "not-allowed" } : {}} onClick={() => handleChange("children", -1)}>
							{minusSvg}
						</button>
						<span style={{ color: "black" }}>{order.children}</span>
						<button onClick={() => handleChange("children", 1)}>{plusSvg}</button>
					</div>
				</div>
				<div className='guest-type'>
					<h3>Infants</h3>
					<div>
						<button style={order.infants < 1 ? { opacity: "0.2", cursor: "not-allowed" } : {}} onClick={() => handleChange("infants", -1)}>
							{minusSvg}
						</button>
						<span style={{ color: "black" }}>{order.infants}</span>
						<button onClick={() => handleChange("infants", 1)}>{plusSvg}</button>
					</div>
				</div>
			</div>
		</div>
	);
}
