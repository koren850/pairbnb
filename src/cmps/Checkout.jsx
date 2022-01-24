import React, { useEffect, useState } from "react";
import addWeeks from "date-fns/addWeeks";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { Guests } from "./Guests";
import remove from "../styles/svg/delete-date.svg";

import plus from "../styles/svg/plus.svg";
import minus from "../styles/svg/minus.svg";
import { SpecialButton } from "./SpacialButton";
import { circularProgressClasses } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import reviewStar from "../styles/svg/star.svg";

const theme = createTheme({
	palette: {
		primary: {
			main: "#FF385C",
		},
		secondary: {
			main: "#FF385C",
		},
	},
});

export function Checkout({ stay, avg }) {
	const [order, setOrder] = useState({ checkIn: null, checkOut: null, guestsCount: 1, adults: 1, children: 0, infants: 0 });
	const [guests, toggleGuests] = useState(false);

	function reserveOrder(ev, args) {
		console.log(args);
	}

	function openGuests() {
		toggleGuests(!guests);
	}

	function handleChange(type, diff) {
		if (type === "adults" && order[type] + diff < 1) return;
		if (order[type] + diff < 0) return;
		setOrder({ ...order, guestsCount: order.guestsCount + diff, [type]: order[type] + diff });
	}

	function getTotalPrice() {
		// if (new Date(order.checkIn).getMonth() > new Date(order.checkOut).getMonth()) {
		return (new Date(order.checkOut) - new Date(order.checkIn)) / (1000 * 60 * 60 * 24);

		// }
		// console.log(new Date(order.checkIn).getDate());
		// console.log(order.checkIn);
	}

	const minusSvg = <img className='plus-minus' src={minus} />;
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
						<span>
							<img className='star-checkout' src={reviewStar} />
						</span>
						<span className='avg-checkout'> {avg} · </span>
						<span className='reviews'>{stay.reviews.length} reviews</span>
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
				<SpecialButton
					args={{ checkIn: order.checkIn, checkOut: order.checkOut, guestCount: order.guestsCount, price: getTotalPrice() * stay.price * 1.025 }}
					onClick={reserveOrder}
					text='Check availability'
				/>
				{guests && <Guests init={order} set={setOrder} />}
				{order.checkIn && order.checkOut && (
					<div className='price-container'>
						<div>
							<div className='flex price-details'>
								<div>
									${stay.price} X {getTotalPrice()} nights
								</div>
								<div>${getTotalPrice() * stay.price}</div>
							</div>
							<div className='flex price-details'>
								<div>Service fee</div>
								<div>${parseInt(getTotalPrice() * stay.price * 0.025)}</div>
							</div>
						</div>
						<div className='flex total-price'>
							<h3> Total price:</h3>
							<h3>${parseInt(getTotalPrice() * stay.price * 1.025)}</h3>
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
export function MinMaxDateRangePicker({ order, setOrder }) {
	const removeUrl = (
		<img onClick={() => setOrder({ ...order, checkIn: null, checkOut: null, guestsCount: 1, adults: 1, children: 0, infants: 0 })} className='clear-dates' src={remove} />
	);
	// const [value, setValue] = React.useState([null, null]);
	return (
		<ThemeProvider theme={theme}>
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
							<TextField className={"end-date"} {...endProps} />
							<span>{removeUrl}</span>
						</React.Fragment>
					)}
				/>
			</LocalizationProvider>
		</ThemeProvider>
	);
}
