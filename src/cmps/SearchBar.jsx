import { useEffect, useRef, useState } from "react";
import searchSvg from "../styles/svg/search.svg";
import { SpecialButton } from "./SpacialButton";
import { connect } from "react-redux";
import { toggleDetailsLayout, toggleHeaderIsDark, toggleHeaderIsActive } from "../store/header.action";
import { Guests } from "./Guests";
import { SearchBarFilterInput } from "./SearchBarFilterInput";
import { stayService } from "../services/stay.service";
import { useHistory } from "react-router-dom";
import { SearchBarDatePicker } from "./SearchBarDatePicker";


function _SearchBar({ toggleHeaderIsActive, headerMode, isScreenOpen, setIsScreenOpen }) {
	const [someActive, setSomeActive] = useState(null);
	const [locationsData, setLocationsData] = useState(null);
	const [userProps, setUserProps] = useState({ location: '', checkIn: null, checkOut: null, guestsCount: 1, adults: 1, children: 0, infants: 0 });
	const elLocationInput = useRef();
	const history = useHistory();
	const { checkIn, checkOut } = userProps;
	function updateSomeActive(elName, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (elName === 'location') {
			setIsScreenOpen(true);
			elLocationInput.current.focus();
		} 
		(elName === 'check-in' || elName === 'check-out') ? setIsScreenOpen(true) : setIsScreenOpen(false);
		if (someActive === elName) {
			setSomeActive(null)
			setIsScreenOpen(false)
		} else {
			setSomeActive(elName);
			setIsScreenOpen(true)
		}

	}

	function onSearch(ev) {
		if (someActive !== ("guests")) ev.stopPropagation();
		const searchKeys = Object.keys(userProps);
		let params = '/explore/';
		searchKeys.forEach(key => params += `${key}=${userProps[key]}&`)
		history.push(params.slice(0, -1))
	}

	// function turnOffSome() {
	// 	if (someActive === "check-in" && isScreenOpen) return setSomeActive("check-out");
	// 	console.log(someActive);
	// 	if (!headerMode.isActive) return;
	// 	if (window.scrollY < 1) return setSomeActive(null);
	// 	someActive ? setSomeActive(null) : toggleHeaderIsActive(false);
	// }

	function turnOffSome() {

	}

	function ChooseLocation(location) {
		setUserProps({ ...userProps, location });
	}

	function ChooseDates(dates) {
		const checkIn = (dates[0]) ? new Date(dates[0]).toDateString() : null;
		const checkOut = (dates[1]) ? new Date(dates[1]).toDateString() : null;
		setUserProps({ ...userProps, checkIn, checkOut });
	}

	useEffect(() => {
		setInitialData()
		async function setInitialData() {
			const data = await stayService.query();
			setLocationsData(data);
		};
		window.addEventListener("click", turnOffSome);
		window.addEventListener("scroll", turnOffSome);
		return () => {
			window.removeEventListener("click", turnOffSome);
			window.removeEventListener("scroll", turnOffSome);
		};
	}, []);

	return (
		<div className={"bar origi " + (someActive && "active-search-bar")}>
			{(isScreenOpen && (someActive === 'check-in' || someActive === 'check-out')) && <SearchBarDatePicker ChooseDates={ChooseDates} />}
			<div onClick={(ev) => updateSomeActive("location", ev)} className={"location origi " + (someActive === "location" ? "active" : "")}>
				<p>Location</p>
				<SearchBarFilterInput someActive={someActive} setIsScreenOpen={setIsScreenOpen} isScreenOpen={isScreenOpen} elLocationInput={elLocationInput} ChooseLocation={ChooseLocation} placeholder={'Where are you going ?'} data={locationsData} />
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("check-in", ev)} className={"check-in origi " + (someActive === "check-in" ? "active" : "")}>
				<p>Check in</p>
				<input className='bar-input' readOnly type='text' placeholder={checkIn ? checkIn : 'Add dates'} />
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("check-out", ev)} className={"check-out origi " + (someActive === "check-out" ? "active" : "")}>
				<p>Check out</p>
				<input className='bar-input' readOnly type='text' placeholder={checkOut ? checkOut : 'Add dates'} />
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("guests", ev)} className={"guests origi " + (someActive === "guests" ? "active" : "")}>
				<p>Guests</p>
				<div className='header-guests'>{someActive === "guests" && <Guests init={userProps} set={setUserProps} />}</div>
				<input value={userProps.guestsCount === 1 ? "" : userProps.guestsCount} readOnly className='bar-input' type='text' placeholder='Add guests' />
				<div className='spacial-btn search-spacial-btn'>
					<SpecialButton
						onClick={onSearch}
						args={userProps}
						isActive={someActive}
						size={{ width: "50px", height: "50px" }}
						text={<img src={searchSvg} className='search-svg' alt='' />}
					/>
				</div>
			</div>
		</div>
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
};

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBar);
