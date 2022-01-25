import React from "react";

import { StayPreview } from "./StayPreview";

export function StayList({ staysToShow }) {
	return (
		<div className='stay-list-container middle-layout'>
			{staysToShow.map((stay, idx) => {
				return <StayPreview key={idx} stay={stay} />;
			})}
		</div>
	);
}
