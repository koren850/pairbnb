import React from "react";
import { Link } from "react-router-dom";

export function StayPreview({ stay }) {
	return (
		<div>
			<h1>{stay.name}</h1>
			<Link to={`/details/${stay._id}`}><img src={stay.imgUrls[0]} /></Link>
		</div>
	);
}
