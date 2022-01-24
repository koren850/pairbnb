import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { loadStays, loadSearchedStays } from "../store/stay.action.js";
import { toggleIsExplore, toggleHeaderIsTop, toggleHeaderIsActive } from "../store/header.action.js";

import { SortAmenities } from "../cmps/Explore/Filter/SortAmenities";
import { StayList } from "../cmps/Explore/StayList.jsx";
import { Loader } from "../cmps/General/Loader";

export function _Explore({ match, loadStays, loadSearchedStays, stays, toggleIsExplore }) {
	const [currStays, setCurrStays] = useState(null)
	const [searchLocation, setSearchLocation] = useState(null)

	useEffect(async () => {
		toggleIsExplore(true);
		if (match.params.search) {
			const { search } = match.params
			let searchParams = search.split('&')
			let params = {}
			searchParams.forEach(param => {
				let searchObj = param.split('=')
				params[searchObj[0]] = searchObj[1]
			})
			setSearchLocation(params.location)
			await loadSearchedStays(params)
			setCurrStays({ stays });
		} else {
			await loadStays();
			setCurrStays({ stays });
		}
	}, [match.params])

	if (!stays) return <Loader />;
	return (
		<main className='main-layout main-container'>
			<section className='middle-layout'>
				<SortAmenities />
				{searchLocation &&
					<div>
						<div className="sort-stays-seperator"></div>
						<div className="explore-search-stays">{stays.length} stays in {searchLocation}</div>
					</div>}
				{!stays.length ? (
					<div className='empty-list'>
						<h2>Nothing comes up here</h2>
						<h3>Try adjusting some of your filters to explore more places to stay.</h3>
					</div>
				) : (
					<StayList stays={stays} />
				)}
			</section>
		</main>
	);
}

function mapStateToProps({ stayModule }) {
	return {
		stays: stayModule.stays,
	};
}
const mapDispatchToProps = {
	loadStays,
	loadSearchedStays,
	toggleIsExplore,
	toggleHeaderIsTop,
	toggleHeaderIsActive,
};

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore);
