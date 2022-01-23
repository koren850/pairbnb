import searchSvg from "../styles/svg/search.svg";
import { SpecialButton } from "./SpacialButton";
export function Search({onToggleIsActive,setIsSearchBarOpen}) {
	function handleSearchClick() {
		setIsSearchBarOpen(true);
		onToggleIsActive();
	}
	return (
		<nav className='search' onClick={handleSearchClick}>
			<p>Start your search</p>
			<div className='spacial-btn search-spacial-btn'>
				<SpecialButton text={<img src={searchSvg} className='search-svg' alt='' />} />
			</div>
		</nav>
	);
}
