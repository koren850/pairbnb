import React, { useState } from "react";

import { Guests } from "../General/Guests";
import { SpecialBtn } from "../General/SpecialBtn";
import { DatePicker } from "./DatePicker.jsx";
import reviewStar from "../../styles/svg/star.svg";

export function Checkout({ stay, avg }) {
	const [order, setOrder] = useState({ checkIn: null, checkOut: null, guestsCount: 1, adults: 1, children: 0, infants: 0 });
	const [isGuestsActive, toggleGuests] = useState(false);

	function reserveOrder(ev, args) {
		console.log(args);
	}

	function onToggleGuests() {
		toggleGuests(!isGuestsActive);
	}

	function getTotalNights() {
		return (new Date(order.checkOut) - new Date(order.checkIn)) / (1000 * 60 * 60 * 24);
	}

	return (
		<main className='special-btn checkout-container'>
			{isGuestsActive && <div onClick={() => toggleGuests()} className='guest-screen'></div>}
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
						<DatePicker order={order} setOrder={setOrder} />
					</div>

					<div onClick={onToggleGuests} className='guest-input'>
						<label>guests</label>
						<div>
							{order.guestsCount} {order.guestsCount > 1 ? "guests" : "guest"}
						</div>
					</div>
				</div>
				<SpecialBtn
					args={{ checkIn: order.checkIn, checkOut: order.checkOut, guestCount: order.guestsCount, price: getTotalNights() * stay.price }}
					onClick={reserveOrder}
					text='Check availability'
				/>
				{isGuestsActive && <Guests init={order} set={setOrder} />}
				{order.checkIn && order.checkOut && (
					<div className='price-container'>
						<div>
							<div className='flex price-details'>
								<div>
									${stay.price} X {getTotalNights()} nights
								</div>
								<div>${getTotalNights() * stay.price}</div>
							</div>
							<div className='flex price-details'>
								<div>Service fee</div>
								<div>${parseInt(getTotalNights() * stay.price * 0.025)}</div>
							</div>
						</div>
						<div className='flex total-price'>
							<h3> Total price:</h3>
							<h3>${parseInt(getTotalNights() * stay.price * 1.025)}</h3>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}