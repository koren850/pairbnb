import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import airLogoSvg from "../styles/svg/air-logo.svg";
import airDarkLogoSvg from "../styles/svg/air-dark-logo.svg";
import userSvg from "../styles/svg/user.svg";
import hamburgerSvg from "../styles/svg/hamburger.svg";
import { Search } from "./Search";
import { SearchBar } from "./SearchBar";
import { toggleDetailsLayout, toggleHeaderIsDark, toggleHeaderIsActive, toggleIsExplore } from "../store/header.action";
import { click } from "@testing-library/user-event/dist/click";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserModal } from "./UserModal";
import {userService} from "../services/user.service";


function _AppHeader({ toggleDetailsLayout, toggleHeaderIsDark, toggleIsExplore, toggleHeaderIsActive, headerMode }) {
	const { headerLayoutSmall, isDark, isActive, isExplore } = headerMode;
	const [userModalState, toggleModal] = useState(false);
	const location = useLocation();
	const history = useHistory();
	const [isScreenOpen, setIsScreenOpen] = useState(true);
	
	function onToggleIsActive() {
		toggleHeaderIsActive(!isActive);
	}
	
	const img = getImgToShow(); 
	
	function getImgToShow() {
		let currUser = userService.getLoggedinUser();
		return (currUser) ? (currUser.imgUrl ? currUser.imgUrl : userSvg ) : userSvg;
	}

	function resetHeaderModes() {
		if (history.location.pathname !== "/") return toggleIsExplore(true);
		if (isExplore) return;
		if (window.scrollY <= 1) {
			if (isExplore) {
				toggleHeaderIsActive(false);
				toggleHeaderIsDark(false);
			} else {
				toggleHeaderIsActive(true);
				toggleHeaderIsDark(true);
			}
		} else {
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		}
	}

	// useEffect(() => {
	// 	console.log("yee");
	// 	window.addEventListener("click", () => toggleOpenModal(false));
	// 	return () => {
	// 		window.removeEventListener("click", () => toggleOpenModal(false));
	// 	};
	// }, []);

	useEffect(() => {
		if (!location.pathname || location.pathname === "/") {
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		} else if (location.pathname.includes("details")) {
			console.log("dont");
			toggleIsExplore(true);
			toggleDetailsLayout(true);
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		} else {
			console.log("mashu aher");
			toggleIsExplore(true);
			toggleDetailsLayout(false);
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		}
		window.addEventListener("scroll", resetHeaderModes);
		return () => {
			window.removeEventListener("scroll", resetHeaderModes);
			toggleIsExplore(true);
		};
	}, []);

	return (
		<header
		className={`app-header column ${isExplore ? "explore-header" : ""} ${isActive ? "active-header" : ""} ${isDark ? "dark-header" : ""} header-layout ${
			headerLayoutSmall ? "detail-layout" : "main-layout"
		}`}>
			<div className={isScreenOpen ? "screen screen-open full-layout" : "screen full-layout"}></div>
			{userModalState && <UserModal currState={userModalState} toggleModal={toggleModal} />}
			<section className='short-search-bar middle-layout'>
				<Link to={`/`}>
					<span className='logo'>
						P{isDark ? <img src={airDarkLogoSvg} className='air-logo' alt='' /> : <img src={airLogoSvg} className='air-logo' alt='' />}I<span className='logo-r'>R</span>
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
					<button onClick={() => toggleModal(true)} className='user-menu'>
						<img className='hamburger-svg' src={hamburgerSvg} />
						<img className='user-svg' src={img} />
					</button>
				</article>
			</section>
			<nav className='middle-layout search-bar-container'>{isActive && <SearchBar setIsScreenOpen={setIsScreenOpen} isScreenOpen={isScreenOpen} onToggleIsActive={onToggleIsActive} />}</nav>
		</header>
	);
}

function mapStateToProps({ headerModule }) {
	return {
		headerMode: headerModule.headerMode,
	};
}
const mapDispatchToProps = {
	toggleDetailsLayout,
	toggleHeaderIsDark,
	toggleHeaderIsActive,
	toggleIsExplore,
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
