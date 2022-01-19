import React from "react";
// import { Link } from "react-router-dom";
import { StayPreview } from "./StayPreview";
export function StayList({ stays }) {
	console.log(stays)
	return (
		<div className="stay-list-container middle-layout">
			{stays.map((stay, idx) => { return <StayPreview key={idx} stay={stay} /> })}
		</div>
	);
}
