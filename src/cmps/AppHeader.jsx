import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import airLogoSvg from "../styles/svg/air-logo.svg";
import airDarkLogoSvg from "../styles/svg/air-dark-logo.svg";
import userSvg from "../styles/svg/user.svg";
import hamburgerSvg from "../styles/svg/hamburger.svg";
import { Search } from "./Search";
import { SearchBar } from "./SearchBar"
import { toggleDetails } from "../store/stay.action";
import { click } from "@testing-library/user-event/dist/click";

function _AppHeader({ toggleDetails, layout }) {
	const [headerModes, setHeaderModes] = useState({ isActive: true, isDark: true });
	const { isActive, isDark } = headerModes;
	const location = useLocation();
	function onToggleIsActive() {
		setHeaderModes({ isDark, isActive: !isActive })
	}

	function resetHeaderModes() {
		setHeaderModes({ isActive: false, isDark: false })
		window.removeEventListener('scroll', resetHeaderModes);
	}
	useEffect(() => {
		if (isDark) window.addEventListener('scroll', resetHeaderModes);
		if (location.pathname.includes("details")) {
			toggleDetails(true);
		} else toggleDetails(false);
		return () => {
			window.removeEventListener('scroll', resetHeaderModes);
		}
	}, [layout, headerModes]);

	console.log(isActive, isDark)

	return (
		<header className={`app-header column ${isActive && 'active-header'} ${isDark && 'dark-header'} header-layout ${layout ? "detail-layout" : "main-layout"}`}>
			<section className='short-search-bar middle-layout'>
				<Link to={`/`}>
					<span className='logo'>
						P
						{isDark ? <img src={airDarkLogoSvg} className='air-logo' alt='' />
							: <img src={airLogoSvg} className='air-logo' alt='' />}
						I<span className='logo-r'>R</span>
						<small>B</small>
						<small>
							<sub>n</sub>
						</small>
						<small>B</small>
					</span>
				</Link>
				{!isActive && <Search onToggleIsActive={onToggleIsActive} />}
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
			<nav className="middle-layout search-bar-container">
				{isActive && <SearchBar onToggleIsActive={onToggleIsActive} isDark={isDark} isActive={isActive} />}
			</nav>
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
