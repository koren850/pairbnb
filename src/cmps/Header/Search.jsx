import { SpecialBtn } from "../General/SpecialBtn";

import searchSvg from "../../styles/svg/search.svg";

export function Search({onToggleIsActive,setIsSearchBarOpen}) {
	function handleSearchClick() {
		setIsSearchBarOpen(true);
		onToggleIsActive();
	}
	return (
		<nav className='search' onClick={handleSearchClick}>
			<p>Start your search</p>
			<div className='special-btn search-special-btn'>
				<SpecialBtn text={<img src={searchSvg} className='search-svg' alt='' />} />
			</div>
		</nav>
	);
}
