import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Checkout } from "../cmps/Checkout";
import { stayService } from "../services/stay.service";
import { toggleDetails } from "../store/stay.action";

function _StayDetails({ match, toggleDetails }) {
	const [stay, setStay] = useState(null);

	useEffect(async () => {
		const stayByid = await stayService.getById(match.params.id);
		console.log(stayByid);
		setStay(stayByid);
		toggleDetails(true);
		console.log("hello");
		return () => {
			console.log("bye");
			toggleDetails(false);
		};
	}, []);

	if (!stay) return <div>Loading...</div>;
	return (
		<main className='detail-layout'>
			<div className='middle-layout'>
				<h1>{stay.name}</h1>
				<h3>{stay.loc.address}</h3>
				<div className='details-img-container'>
					<img className='main-img' src={stay.imgUrls[0]} alt='' />
					<img className='small-img' src={stay.imgUrls[1]} alt='' />
					<img className='small-img corner-top' src={stay.imgUrls[2]} alt='' />
					<img className='small-img' src={stay.imgUrls[4]} alt='' />
					<img className='small-img corner-bottom' src={stay.imgUrls[5]} alt='' />
				</div>
				<div className='stay-info-container'>
					<div className='stay-info'>
						<h1>
							{stay.type} hosted by {stay.host.inside}
						</h1>
						<ul className='stay-baths-beds flex'>
							{stay.capacity} guests
							<li>{stay.capacity - 1} beds</li>
							<li>{parseInt(stay.capacity / 2)} baths</li>
						</ul>
						<ul>
							<li>
								<h3>Entire home</h3>
								<span>You will have the houseboat to yourself.</span>
							</li>
							<li>
								<h3>Enhanced Clean</h3>
								<span>This Host committed to Airbnb's 5-step enhanced cleaning process.</span>
							</li>
							<li>
								<h3>Self check-in</h3>
								<span>Check yourself in with the lockbox.</span>
							</li>
						</ul>
						<h2>{stay.summary}</h2>
					</div>
					<Checkout />
				</div>
			</div>
		</main>
	);
}

function mapStateToProps({}) {
	return {};
}
const mapDispatchToProps = {
	toggleDetails,
};

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails);
