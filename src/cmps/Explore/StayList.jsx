import React from "react";

import { StayPreview } from "./StayPreview";

export function StayList({ stays }) {
	return (
		<div className="stay-list-container middle-layout">
			{stays.map((stay, idx) => { return <StayPreview key={idx} stay={stay} /> })}
		</div>
	);
}
