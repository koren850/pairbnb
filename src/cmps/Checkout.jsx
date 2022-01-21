import React, { useEffect, useState } from "react";
import addWeeks from "date-fns/addWeeks";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";

import plus from "../styles/svg/plus.svg";
import minus from "../styles/svg/minus.svg";
import { SpecialButton } from "./SpacialButton";
import { circularProgressClasses } from "@material-ui/core";

export function Checkout({ stay }) {
	const [order, setOrder] = useState({ checkIn: null, checkOut: null, guestsCount: 1, adults: 1, children: 0, infants: 0 });
	const [guests, toggleGuests] = useState(false);

	function reserveOrder(...args) {}

	function openGuests() {
		toggleGuests(!guests);
	}

	function handleChange(type, diff) {
		if (type === "adults" && order[type] + diff < 1) return;
		if (order[type] + diff < 0) return;
		setOrder({ ...order, guestsCount: order.guestsCount + diff, [type]: order[type] + diff });
	}

	const minusSvg = <img className='plus-minus' src={minus} />;
	console.log(minusSvg);
	const plusSvg = <img className='plus-minus' src={plus} />;

	return (
		<main className='spacial-btn checkout-container'>
			{guests && <div onClick={() => toggleGuests(false)} className='guest-screen'></div>}
			<section className='order-container'>
				<div className='order-form-header'>
					<p>
						<span className='cost'>${stay.price}</span> / night
					</p>
					<p>
						<span className='reviews'>({stay.reviews.length} reviews)</span>
					</p>
				</div>

				<div className='order-data'>
					<div className='date-picker'>
						<MinMaxDateRangePicker order={order} setOrder={setOrder} />
					</div>

					<div onClick={openGuests} className='guest-input'>
						<label>guests</label>
						<div>
							{order.guestsCount} {order.guestsCount > 1 ? "guests" : "guest"}
						</div>
					</div>
				</div>
				<SpecialButton args={null} onClick={reserveOrder} text='Check availability' />
				{guests && (
					<div className='guests'>
						<div className='guest-add flex'>
							<div className='guest-type'>
								<h3>Adults</h3>
								<div>
									<button onClick={() => handleChange("adults", -1)}>{minusSvg}</button>
									<span style={{ color: "black" }}>{order.adults}</span>
									<button onClick={() => handleChange("adults", 1)}>{plusSvg}</button>
								</div>
							</div>
							<div className='guest-type'>
								<h3>Children</h3>
								<div>
									<button onClick={() => handleChange("children", -1)}>{minusSvg}</button>
									<span style={{ color: "black" }}>{order.children}</span>
									<button onClick={() => handleChange("children", 1)}>{plusSvg}</button>
								</div>
							</div>
							<div className='guest-type'>
								<h3>Infants</h3>
								<div>
									<button onClick={() => handleChange("infants", -1)}>{minusSvg}</button>
									<span style={{ color: "black" }}>{order.infants}</span>
									<button onClick={() => handleChange("infants", 1)}>{plusSvg}</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}

function getWeeksAfter(date, amount) {
	return date ? addWeeks(date, amount) : undefined;
}
function MinMaxDateRangePicker({ order, setOrder }) {
	// const [value, setValue] = React.useState([null, null]);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateRangePicker
				disablePast
				value={[order.checkIn, order.checkOut]}
				maxDate={getWeeksAfter(order.checkIn, 8)}
				onChange={(newValue) => {
					setOrder({ ...order, checkIn: newValue[0], checkOut: newValue[1] });
				}}
				startText='Check-in'
				endText='Check-out'
				renderInput={(startProps, endProps) => (
					<React.Fragment>
						<TextField className={"start-date"} {...startProps} />
						<TextField {...endProps} />
					</React.Fragment>
				)}
			/>
		</LocalizationProvider>
	);
}
