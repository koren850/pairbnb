import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadStays } from "../store/stay.action.js";
import { Filter } from "../cmps/Filter";

// import { Link } from "react-router-dom";

import { StayList } from "../cmps/StayList.jsx";

export function _Explore({}) {
	const [stays, setStays] = useState(null);

	useEffect(() => {
		const stay = loadStays();
	});

	return (
		// const { stays } = t
		<main>
			<div>Explore page</div>
			<Filter />

			<StayList />
		</main>
	);
}

function mapStateToProps({ stayModule }) {
	return {
		stays: stayModule.toys,
	};
}
const mapDispatchToProps = {
	loadStays,
};

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore);
