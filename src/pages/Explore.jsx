import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadStays, loadSearchedStays } from "../store/stay.action.js";
import { SortAmenities } from "../cmps/Explore/Filter/SortAmenities";
import { Loader } from "../cmps/General/Loader";
import { toggleIsExplore, toggleHeaderIsDark, toggleHeaderIsActive } from "../store/header.action.js";

import { StayList } from "../cmps/Explore/StayList.jsx";

export function _Explore({ match, loadStays, loadSearchedStays, stays, toggleIsExplore, toggleHeaderIsDark, toggleHeaderIsActive }) {
	const [currStays, setCurrStays] = useState(null);
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
			await loadSearchedStays(params)
			setCurrStays({ stays });
		} else {
			await loadStays();
			setCurrStays({ stays });
		}
	}, []);

	if (!stays) return <Loader />;
	return (
		<main className='main-layout main-container'>
			<section className='middle-layout'>
				<SortAmenities />
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
	toggleHeaderIsDark,
	toggleHeaderIsActive,
};

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore);
