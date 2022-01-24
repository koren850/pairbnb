import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { userService } from "../../services/user.service";
import { toggleDetailsLayout, toggleHeaderIsDark, toggleHeaderIsActive, toggleIsExplore } from "../../store/header.action";

import { Search } from "./Search";
import { SearchBar } from "./SearchBar";
import { UserModal } from "./User/UserModal";

import airLogoSvg from "../../styles/svg/air-logo.svg";
import airDarkLogoSvg from "../../styles/svg/air-dark-logo.svg";
import userSvg from "../../styles/svg/user.svg";
import hamburgerSvg from "../../styles/svg/hamburger.svg";

function _AppHeader({ toggleDetailsLayout, toggleHeaderIsDark, toggleIsExplore, toggleHeaderIsActive, headerMode }) {

	const { headerLayoutSmall, isDark, isActive, isExplore } = headerMode;

	const [userModalState, toggleModal] = useState(false);
	const [isScreenOpen, setIsScreenOpen] = useState(false);
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(isActive);
	const [someActive, setSomeActive] = useState(null);

	const location = useLocation();
	const history = useHistory();
	const img = getImgToShow();

	function onToggleIsActive() {
		toggleHeaderIsActive(!isActive);
	}

	function getImgToShow() {
		let currUser = userService.getLoggedinUser();
		return (currUser) ? (currUser.imgUrl ? currUser.imgUrl : userSvg) : userSvg;
	}

	function resetHeaderModes() {
		if (history.location.pathname !== "/") return toggleIsExplore(true);
		if (isExplore) return;
		if (window.scrollY <= 1) {
			if (isExplore) {
				toggleHeaderIsActive(false);
				toggleHeaderIsDark(false);
			} else {
				setSomeActive(null);
				toggleHeaderIsActive(true);
				toggleHeaderIsDark(true);
			}
		} else {
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		}
	}

	function turnOffSome() {
		someActive ? setSomeActive(null) : toggleHeaderIsActive(false);
	}

	function handleSearchModals(ev) {
		ev.stopPropagation()
		setIsScreenOpen(!isScreenOpen);
		turnOffSome();
	}

	function handleCloseSearchBar(ev) {
		ev.stopPropagation()
		if (!isExplore && isDark) return;
		toggleHeaderIsActive(!isActive);
		setIsSearchBarOpen(!isSearchBarOpen);
	}

	useEffect(() => {
		if (!location.pathname || location.pathname === "/") {
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		} else if (location.pathname.includes("details")) {
			toggleIsExplore(true);
			toggleDetailsLayout(true);
			toggleHeaderIsActive(false);
			toggleHeaderIsDark(false);
		} else {
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
			className={`app-header column ${isExplore ? "explore-header" : ""} ${isActive ? "active-header" : ""} ${isDark ? "dark-header" : ""} header-layout ${headerLayoutSmall ? "detail-layout" : "main-layout"
				}`}>
			<div onClick={handleSearchModals} className={isScreenOpen ? "screen screen-open full-layout" : "screen full-layout"}></div>
			<div onClick={handleCloseSearchBar} className={isSearchBarOpen ? "screen screen-open search-bar-screen full-layout" : "search-bar-screen  screen full-layout"}></div>
			{userModalState && <UserModal currState={userModalState} toggleModal={toggleModal} />}
			<section className='short-search-bar middle-layout'>
				<Link to={`/`}>
					<span className='logo'>
						P{isDark ? <img src={airDarkLogoSvg} className='air-logo' alt='' /> : <img src={airLogoSvg} className='air-logo' alt='' />}I<span className='logo-r'>R</span>
						BNB
					</span>
				</Link>

				{!isActive && <Search isSearchBarOpen={isSearchBarOpen} setIsSearchBarOpen={setIsSearchBarOpen} onToggleIsActive={onToggleIsActive} />}
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
			<nav className='middle-layout search-bar-container'>{isActive && <SearchBar turnOffSome={turnOffSome} setSomeActive={setSomeActive} someActive={someActive} isScreenOpen={isScreenOpen} setIsScreenOpen={setIsScreenOpen} ToggleIsActive={onToggleIsActive} />}</nav>
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
