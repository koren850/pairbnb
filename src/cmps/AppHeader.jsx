import React from "react";
import { Link } from "react-router-dom";

export function AppHeader() {
	return (
		<div className='app-header'>
			<header>PairBNB Project</header>
			<div className='nav-links'>
				<Link to={`/`}>Home</Link>
				<Link to={`/explore`}> Explore</Link>
			</div>
		</div>
	);
}
