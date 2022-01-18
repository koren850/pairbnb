import React from "react";
import { Link } from "react-router-dom";

export function StayPreview() {
	return (
		<div>
			<Link to={"/details/TestId1234"}>preview</Link>
		</div>
	);
}
