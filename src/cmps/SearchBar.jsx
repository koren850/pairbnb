import { useEffect, useRef, useState } from "react";
import searchSvg from "../styles/svg/search.svg";
import { SpecialButton } from "./SpacialButton";
import { connect } from "react-redux";
import { toggleDetailsLayout, toggleHeaderIsDark, toggleHeaderIsActive } from "../store/header.action";
import { Guests } from "./Guests";
import { SearchBarFilterInput } from "../cmps/SearchBarFilterInput";
import { stayService } from "../services/stay.service";

function _SearchBar({ toggleHeaderIsActive, headerMode }) {
	const [someActive, setSomeActive] = useState(null);
	const [locationsData, setLocationsData] = useState(null);
	const [userProps, setUserProps] = useState({ location: '', checkIn: null, checkOut: null, guestsCount: 1, adults: 1, children: 0, infants: 0 });
	const elLocationInput = useRef();

	function updateSomeActive(elName, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (elName === 'location') elLocationInput.current.focus();
		someActive === elName ? setSomeActive(null) : setSomeActive(elName);
	}

	function onSearch(order) {
		console.log(order);
	}

	function turnOffSome() {
		console.log("hello");
		if (!headerMode.isActive) return;
		if (window.scrollY < 1) return setSomeActive(null);
		someActive ? setSomeActive(null) : toggleHeaderIsActive(false);
	}

	function ChooseLocation(location) {
		setUserProps({...userProps,location});
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
			<div onClick={(ev) => updateSomeActive("location", ev)} className={"location origi " + (someActive === "location" ? "active" : "")}>
				<p>Location</p>
			<SearchBarFilterInput elLocationInput={elLocationInput} ChooseLocation={ChooseLocation} placeholder={'Where are you going ?'} data={locationsData} />
				{/* <input type='text' placeholder='Where are you going?' /> */}
			</div>
			<hr />
			{/* <div className={"date-header"}>
				<MinMaxDateRangePicker order={search} setOrder={setGuests} />
			</div> */}
			<div onClick={(ev) => updateSomeActive("check-in", ev)} className={"check-in origi " + (someActive === "check-in" ? "active" : "")}>
				<p>Check in</p>
				<input className='bar-input' readOnly type='text' placeholder='Add dates' />
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("check-out", ev)} className={"check-out origi " + (someActive === "check-out" ? "active" : "")}>
				<p>Check out</p>
				<input className='bar-input' readOnly type='text' placeholder='Add dates' />
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
