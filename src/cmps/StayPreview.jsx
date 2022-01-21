import React from "react";
import { Link } from "react-router-dom";
import reviewStar from "../styles/svg/star.svg";

export function StayPreview({ stay }) {
	return (
		<div>
			<div className='stay-preview'>
				<div className='stay-preview-img'>
					<Link to={`/details/${stay._id}`}>
						<img src={stay.imgUrls[0]} />
					</Link>
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
						<div className='stay-price'>${stay.price} / </div>
						<div className='stay-night'> night</div>
					</div>
				</div>
			</div>
		</div>
	);
}
