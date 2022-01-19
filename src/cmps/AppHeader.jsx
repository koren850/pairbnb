import React from "react";
import { Link } from "react-router-dom";
import airLogoSvg from '../styles/svg/air-logo.svg';
import userSvg from '../styles/svg/user.svg';
import hamburgerSvg from '../styles/svg/hamburger.svg';
import { Search } from './Search';

export function AppHeader() {
	return (
		<header className="app-header main-layout">
			<section className="middle-layout">
				<Link to={`/`}><span className="logo">P
					<img src={airLogoSvg} className="air-logo" alt="" />
					I<span className="logo-r">R</span><small>B</small><small><sub>n</sub></small><small>B</small></span></Link>
					<Search/>
					<article className="nav-link">
				<Link to={`/explore`}> Explore</Link>
				<Link className="s" to={`/explore`}> Become a Host</Link>
				<button className="user-menu">

					<img src={hamburgerSvg}/>
					<div className="user-svg-container">
					<img className="user-svg" src={userSvg}/>
					</div>
				</button>
					</article>
			</section>
		</header>
	);
}
