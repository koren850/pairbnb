import React from "react";
// import { Link } from "react-router-dom";
import { StayPreview } from "./StayPreview";
export function StayList({ stays }) {
	console.log(stays)
	return (
		<div>
			<h1>Stay List</h1>
			<div className="stay-list">
				{stays.map((stay, idx) => { return <StayPreview key={idx} stay={stay} /> })}
			</div>
		</div>
	);
}
