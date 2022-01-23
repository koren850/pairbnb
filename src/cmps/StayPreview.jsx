import React from "react";
import reviewStar from "../styles/svg/star.svg";
import ImageCarousel from "./ImageCarousel.jsx";
import { userService } from "../services/user.service.js";

import greyHeart from "../styles/svg/grey-heart.svg";
import pinkHeart from "../styles/svg/pink-heart.svg";

import { connect } from "react-redux";
import { updateUser } from "../store/user.action.js"

function _StayPreview({ stay, updateUser }) {
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

	function toggleLikedPlace(stay) {
		let loggedinUser = userService.getLoggedinUser();
		console.log(loggedinUser)
		// loggedinUser ? console.log(stayId, loggedinUser) : console.log('please login first')
		let likedStay = loggedinUser.likedStays.find(currStay => {
			return currStay._id === stay._id
		})
		console.log(loggedinUser.likedStays)
		if (likedStay) {
			loggedinUser.likedStays = loggedinUser.likedStays.filter(currStay => {
				return currStay._id !== likedStay._id
			})
		} else {
			loggedinUser.likedStays.push(stay)
		}
		updateUser(loggedinUser)
	}

	return (
		<div>
			<div className='stay-preview'>
				{likedId !== stay._id &&
					< button onClick={() => { toggleLikedPlace(stay) }}>
						<img className='stay-preview-heart' src={greyHeart} />
					</button>}
				{likedId === stay._id &&
					<button button onClick={() => { toggleLikedPlace(stay) }}>
						<img className='stay-preview-heart' src={pinkHeart} />
					</button>
				}
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
function mapStateToProps({ userModule }) {
	return {
		userModule: userModule.user
	};
}
const mapDispatchToProps = {
	updateUser
};

export const StayPreview = connect(mapStateToProps, mapDispatchToProps)(_StayPreview);
