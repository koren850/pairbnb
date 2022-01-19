import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import airLogoSvg from "../styles/svg/air-logo.svg";
import userSvg from "../styles/svg/user.svg";
import hamburgerSvg from "../styles/svg/hamburger.svg";
import { Search } from "./Search";
import { toggleDetails } from "../store/stay.action";

function _AppHeader({ toggleDetails, layout }) {
	const location = useLocation();
	useEffect(async () => {
		if (location.pathname.includes("details")) {
			console.log("hello");
			toggleDetails(true);
		} else toggleDetails(false);
	}, [layout]);

	return (
		<header className={`app-header ${layout ? "detail-layout" : "main-layout"}`}>
			<section className='middle-layout'>
				<Link to={`/`}>
					<span className='logo'>
						P
						<img src={airLogoSvg} className='air-logo' alt='' />I<span className='logo-r'>R</span>
						<small>B</small>
						<small>
							<sub>n</sub>
						</small>
						<small>B</small>
					</span>
				</Link>
				<Search />
				<article className='nav-link'>
					<Link to={`/explore`}> Explore</Link>
					<Link className='become' to={`/explore`}>
						Become a Host
					</Link>
					<button className='user-menu'>
						<img className='hamburger-svg' src={hamburgerSvg} />
						<img className='user-svg' src={userSvg} />
					</button>
				</article>
			</section>
		</header>
	);
}

function mapStateToProps({ stayModule }) {
	return {
		layout: stayModule.headerLayoutSmall,
	};
}
const mapDispatchToProps = {
	toggleDetails,
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
