import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { toggleDetailsLayout, toggleHeaderIsActive } from "../../store/header.action";
import { setParams } from "../../store/stay.action";
import { stayService } from "../../services/stay.service";

import { Guests } from "../General/Guests";
import { SearchBarFilterInput } from "./SearchBarFilterInput";
import { SearchBarDatePicker } from "./SearchBarDatePicker";
import { SpecialBtn } from "../General/SpecialBtn";

import searchSvg from "../../styles/svg/search.svg";

function _SearchBar({ someActive, turnOffSome, setSomeActive, isScreenOpen, setIsScreenOpen, searchParams, setParams,isMobileWidth, isTop }) {
	const [locationsData, setLocationsData] = useState(null);

	const elLocationInput = useRef();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			const data = await stayService.query();
			setLocationsData(data);
		})();
		window.addEventListener("scroll", turnOffSome);
		return () => {
			window.removeEventListener("scroll", turnOffSome);
		};
	}, []);

	function updateSomeActive(elName, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		if (elName === "location" && someActive !== elName) {
			setIsScreenOpen(true);
			elLocationInput.current.focus();
		} else elLocationInput.current.blur();
		// elName === "check-in" || elName === "check-out" ? setIsScreenOpen(true) : setIsScreenOpen(false);
		setIsScreenOpen(elName === "check-in" || elName === "check-out");
		if (someActive === elName) {
			setSomeActive(null);
			setIsScreenOpen(false);
		} else {
			setSomeActive(elName);
			setIsScreenOpen(true);
		}
	}

	function onSearch(ev) {
		if (someActive !== "guests") ev.stopPropagation();
		const searchKeys = Object.keys(searchParams);
		let params = "/explore/";
		console.log(searchParams);
		searchKeys.forEach((key) => (params += `${key}=${searchParams[key]}&`));
		history.push(params.slice(0, -1));
	}

	function ChooseLocation(location) {
		setParams({ ...searchParams, location });
	}

	function ChooseDates(dates) {
		const checkIn = dates[0] ? new Date(dates[0]).toDateString() : null;
		const checkOut = dates[1] ? new Date(dates[1]).toDateString() : null;
		setParams({ ...searchParams, checkIn, checkOut });
	}

	return (
		<div className={"bar original " + ((someActive || (!isTop && isMobileWidth)) && "active-search-bar")}>
			{isScreenOpen && (someActive === "check-in" || someActive === "check-out") && <SearchBarDatePicker ChooseDates={ChooseDates} />}
			<div onClick={(ev) => updateSomeActive("location", ev)} className={"location original " + ((someActive === "location" && !isMobileWidth) ? "active" : "")}>
				<p>Location</p>
				<SearchBarFilterInput
					// searchParams={searchParams}
					someActive={someActive}
					setIsScreenOpen={setIsScreenOpen}
					isScreenOpen={isScreenOpen}
					elLocationInput={elLocationInput}
					ChooseLocation={ChooseLocation}
					placeholder={"Where are you going ?"}
					data={locationsData}
				/>
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("check-in", ev)} className={"check-in original " + (someActive === "check-in" ? "active" : "")}>
				<p>Check in</p>
				<input className='bar-input' readOnly type='text' placeholder={searchParams.checkIn ? searchParams.checkIn : "Add dates"} />
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("check-out", ev)} className={"check-out original " + (someActive === "check-out" ? "active" : "")}>
				<p>Check out</p>
				<input className='bar-input' readOnly type='text' placeholder={searchParams.checkOut ? searchParams.checkOut : "Add dates"} />
			</div>
			<hr />
			<div onClick={(ev) => updateSomeActive("guests", ev)} className={"guests original " + ((someActive && !isMobileWidth) === "guests" ? "active" : "")}>
				<p>Guests</p>
				<div className='header-guests'>{someActive === "guests" && <Guests init={searchParams} set={setParams} />}</div>
				<input value={searchParams.guestsCount === 1 ? "" : searchParams.guestsCount} readOnly className='bar-input' type='text' placeholder='Add guests' />
				<div className='special-btn search-special-btn'>
					<SpecialBtn
						onClick={onSearch}
						args={searchParams}
						isActive={someActive}
						size={{ width: "50px", height: "50px" }}
						text={<img src={searchSvg} className='search-svg' alt='' />}
					/>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps({ headerModule, stayModule }) {
	return {
		headerMode: headerModule.headerMode,
		searchParams: stayModule.searchParams,
	};
}
const mapDispatchToProps = {
	toggleDetailsLayout,
	toggleHeaderIsActive,
	setParams,
};

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBar);
