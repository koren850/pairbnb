import React from "react";
// import { Link } from "react-router-dom";
import { StayPreview } from "./StayPreview";
import {Filter} from "./Filter";
export function StayList() {
	return (
		//Todo add Map all previews
		<div>
			<Filter />
			<h1>Stay List</h1>
			<StayPreview />
		</div>
	);
}
