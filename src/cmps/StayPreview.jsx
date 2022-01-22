import React from "react";
import { Link } from "react-router-dom";
import reviewStar from "../styles/svg/star.svg";
import ImageCarousel from "./ImageCarousel.jsx";

import likeHeart from "../styles/svg/like-heart.svg"
import likeHeartBlack from "../styles/svg/like-heart-black.svg"

export function StayPreview({ stay }) {
	return (
		<div>
			<div className="stay-preview">
				<button><img className="stay-preview-heart" src={likeHeartBlack} /></button>
				<div className="stay-preview-img">
					<ImageCarousel stay={stay} />
				</div>
				<div className='stay-preview-details'>
					<div className='stay-reviews'>
						<img src={reviewStar} /> {stay.reviews}({stay.reviews.length} reviews)
					</div>
					<div className='stay-type-country'>
						{stay.type} • {stay.loc.address}
					</div>
					<div className='stay-name'>{stay.name}</div>
					<div className='stay-price-night'>
						<div className='stay-price'>${stay.price} /<span className='stay-night'>night</span> </div>
					</div>
				</div>
			</div>
		</div>
	);
}
