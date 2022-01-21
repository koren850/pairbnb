import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadStays } from "../store/stay.action.js";
import { SortStay } from "../cmps/SortStay";
import { Loader } from "../cmps/Loader";
import { toggleIsExplore } from "../store/header.action.js";
// import { Link } from "react-router-dom";

import { StayList } from "../cmps/StayList.jsx";

export function _Explore({ loadStays, stays,toggleIsExplore }) {
	const [currStays, setCurrStays] = useState(null);

	useEffect(async () => {
		toggleIsExplore(true);
		await loadStays();
		setCurrStays({ stays });
	}, []);

	if (!stays) return <Loader />;

	return (
		<main className='main-layout main-container'>
			<section className='middle-layout'>
				<SortStay />
				{!stays.length ? <div className="empty-list"><h2>Nothing comes up here</h2>
					<h3>Try adjusting some of your filters to explore more places to stay.</h3></div> :
					<StayList stays={stays} />}

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
	toggleIsExplore,
};

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore);
