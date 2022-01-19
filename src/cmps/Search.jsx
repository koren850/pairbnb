import searchSvg from "../styles/svg/search.svg";
import { SpecialButton } from "./SpacialButton";
export function Search() {
	return (
		<button className='search'>
			<p>Start your search</p>
			<div className='spacial-btn search-spacial-btn'>
				<SpecialButton text={<img src={searchSvg} className='search-svg' alt='' />} />
			</div>
		</button>
	);
}
