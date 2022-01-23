import React from "react";
import { Link } from "react-router-dom";
import reviewStar from "../styles/svg/star.svg";
import ImageCarousel from "./ImageCarousel.jsx";

import likeHeart from "../styles/svg/like-heart.svg";
import likeHeartBlack from "../styles/svg/like-heart-black.svg";

export function StayPreview({ stay }) {
	let avg = 0;
	let ammount = 0;
	stay.reviews.forEach((review) => (ammount += review.rate));
	const divider = stay.reviews.length;
	avg = (ammount / divider).toFixed(1);

	return (
		<div>
			<div className='stay-preview'>
				<button>
					<img className='stay-preview-heart' src={likeHeartBlack} />
				</button>
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
