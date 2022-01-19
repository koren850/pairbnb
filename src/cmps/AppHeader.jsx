import React from "react";
import { Link } from "react-router-dom";

export function AppHeader() {
	return (
			<header className="app-header">
				<h1>PairBNB Project</h1>
			<div className="nav-links">
				<Link to={`/`}>Home</Link>
				<Link to={`/explore`}> Explore</Link>
			</div>
			</header>
	);
}
