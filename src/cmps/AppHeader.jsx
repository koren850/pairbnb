import React from "react";
import { Link } from "react-router-dom";

export function AppHeader() {
	return (
			<header className="app-header main-layout">
				<section className="middle-layout">
			<div className="nav-links">
				<Link to={`/`}><span className="logo">P<span className="air-logo"></span>ir<sub>B</sub>n<sub>B</sub></span></Link><hr/>
				<Link to={`/explore`}> Explore</Link>
			</div>
				</section>
			</header>
	);
}
