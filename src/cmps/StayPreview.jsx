import React from "react";
import reviewStar from "../styles/svg/star.svg";
import ImageCarousel from "./ImageCarousel.jsx";
import { userService } from "../services/user.service.js";

import greyHeart from "../styles/svg/grey-heart.svg";
import pinkHeart from "../styles/svg/pink-heart.svg";

export function StayPreview({ stay }) {
	let avg = 0;
	let ammount = 0;
	stay.reviews.forEach((review) => (ammount += review.rate));
	const divider = stay.reviews.length;
	avg = (ammount / divider).toFixed(1);

	let currUser = userService.getLoggedinUser();
	let likedPlace;
	let likedId;
	if (currUser) {
		console.log(currUser);
		console.log(currUser.likedStays);
		likedPlace = currUser.likedStays.filter((likedstay) => likedstay._id === stay._id);
		if (likedPlace.length > 0) {
			likedId = likedPlace[0]._id;
		}
	}

	function toggleLikedPlace(stayId) {
		let loggedinUser = userService.getLoggedinUser();
		loggedinUser ? console.log(stayId, loggedinUser) : console.log("please login first");
	}

	return (
		<div>
			<div className='stay-preview'>
				{likedId !== stay._id && (
					<button
						onClick={() => {
							toggleLikedPlace(stay._id);
						}}>
						<img className='stay-preview-heart' src={greyHeart} />
					</button>
				)}
				{likedId === stay._id && (
					<button
						button
						onClick={() => {
							toggleLikedPlace(stay._id);
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
						<span>{avg}</span>({stay.reviews.length} reviews)
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
		</div>
	);
}
