import React, { useState } from "react";
import { connect } from "react-redux";

import { userService } from "../../services/user.service.js";
import { updateUser } from "../../store/user.action.js";

import ImageCarousel from "./ImageCarousel.jsx";

import reviewStar from "../../styles/svg/star.svg";
import greyHeart from "../../styles/svg/grey-heart.svg";
import pinkHeart from "../../styles/svg/pink-heart.svg";

function _StayPreview({ stay, fromBackOffice }) {
	let ammount = 0;
	const divider = stay.reviews.length;
	stay.reviews.forEach((review) => (ammount += review.rate));
	const avg = (ammount / divider).toFixed(1);

	const [currUser, setCurrUser] = useState(userService.getLoggedinUser());

	let likedPlace;
	let likedId;

	if (currUser) {
		likedPlace = currUser.likedStays.filter((likedstay) => likedstay._id === stay._id);
		if (likedPlace.length > 0) {
			likedId = likedPlace[0]._id;
		}
	}

	async function toggleLikedPlace(stay) {
		let loggedinUser = userService.getLoggedinUser();
		// USER MSG - ask guest to log in / up / continue as guest for demo purposes
		if (!loggedinUser) return console.log("please sign in first");
		let likedStay = loggedinUser.likedStays.find((currStay) => {
			return currStay._id === stay._id;
		});
		if (likedStay) {
			loggedinUser.likedStays = loggedinUser.likedStays.filter((currStay) => {
				return currStay._id !== likedStay._id;
			});
		} else {
			const miniStay = { _id: stay._id, name: stay.name };
			loggedinUser.likedStays.push(miniStay);
		}
		const newUser = await userService.update(loggedinUser);
		setCurrUser({ ...newUser });
		userService.setLoggedinUser(newUser);
	}

	return (
		<div className='stay-preview'>
			{!fromBackOffice && likedId !== stay._id && (
				<button
					onClick={() => {
						toggleLikedPlace(stay);
					}}>
					<img className='stay-preview-heart' src={greyHeart} />
				</button>
			)}
			{!fromBackOffice && likedId === stay._id && (
				<button
					button
					onClick={() => {
						toggleLikedPlace(stay);
					}}>
					<img className='stay-preview-heart' src={pinkHeart} />
				</button>
			)}
			<div className='stay-preview-img'>
				<ImageCarousel stay={stay} />
			</div>
			<div className='stay-preview-details'>
				<div className='stay-reviews'>
					<img src={reviewStar} />
					<span className='stay-reviews-total'>{avg}</span>
					<span className='stay-reviews-brackets'>({stay.reviews.length} reviews)</span>
				</div>
				<div className='stay-type-country'>
					{stay.type} • {stay.loc.address}
				</div>
				<div className='stay-name'>{stay.name}</div>
				<div className='stay-price-night'>
					<div className='stay-price'>
						${stay.price} /<span className='stay-night'>night</span>
					</div>
				</div>
			</div>
		</div>
	);
}
function mapStateToProps({ userModule, stayModule }) {
	return {
		userModule: userModule.user,
		stays: stayModule.stays,
	};
}
const mapDispatchToProps = {
	updateUser,
};

export const StayPreview = connect(mapStateToProps, mapDispatchToProps)(_StayPreview);
