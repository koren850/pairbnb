import React from "react";
import { Link } from "react-router-dom";


export function StayPreview({ stay }) {
	return (
		<div className="stay-preview">
			<div className="stay-preview-img">
				<Link to={`/details/${stay._id}`}><img src={stay.imgUrls[0]} /></Link>
			</div>
			<div className="stay-preview-details">
				<div className="stay-reviews">⭐{stay.reviews}({stay.reviews.length} reviews)</div>
				<div className="stay-type-country">{stay.type} • {stay.loc.country}</div>
				<div className="stay-name">{stay.name}</div>
				<div className="stay-price">${stay.price}/ night</div>
			</div>
		</div>
	);
}
