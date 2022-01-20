import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadStays } from "../store/stay.action.js";
import { SortStay } from "../cmps/SortStay";

// import { Link } from "react-router-dom";

import { StayList } from "../cmps/StayList.jsx";

export function _Explore({ loadStays, stays }) {
	const [currStays, setCurrStays] = useState(null);

	useEffect(async () => {
		// console.log(stays)
		await loadStays()
		// console.log(stays)
		setCurrStays({ stays })
		// console.log(currStays)
	}, [])


	if (!stays.length || !stays) return <div>Loading...</div>;

	return (
		< main className="main-layout">
			<SortStay />
			<StayList stays={stays} />
		</main >
	);
}

function mapStateToProps({ stayModule }) {
	return {
		stays: stayModule.stays,
	};
}
const mapDispatchToProps = {
	loadStays,
};

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore);
