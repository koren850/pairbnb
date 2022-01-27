import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { Map } from "../cmps/Details/Map";
import { Loader } from "../cmps/General/Loader";
import { Checkout } from "../cmps/Details/Checkout";
import { Amenities } from "../cmps/Details/Amenities";
import { Review } from "../cmps/Details/Review";

import { stayService } from "../services/stay.service";
import { toggleDetailsLayout } from "../store/header.action";

import reviewStar from "../styles/svg/star.svg";
import home from "../styles/svg/entirehome.svg";
import clean from "../styles/svg/clean.svg";
import checkin from "../styles/svg/checkin.svg";
import greyHeart from "../styles/svg/grey-heart.svg";

function _StayDetails({ toggleDetailsLayout }) {
	const params = useParams();
	const [stay, setStay] = useState(null);
	const [avg, setAvg] = useState(0);

	useEffect(() => {
		(async () => {
			const stayByid = await stayService.getById(params.id);
			console.log(stayByid);
			getAvgRating(stayByid);
			setStay(stayByid);
			toggleDetailsLayout(true);
		})();
		return () => {
			toggleDetailsLayout(false);
		};
	}, []);

	function getAvgRating(stayToAvg) {
		let ammount = 0;
		stayToAvg.reviews.forEach((review) => (ammount += review.rate));
		const divider = stayToAvg.reviews.length;
		let calcAvg = (ammount / divider).toFixed(2);
		if ((calcAvg * 100) % 10 == 0) return setAvg(calcAvg);
		if (isNaN(calcAvg)) calcAvg = "";
		setAvg(calcAvg);
	}

	if (!stay) return <Loader />;

	return (
		<main className='detail-layout main-container details-page'>
			<div className='middle-layout'>
				<h1 className='stay-name-details'>{stay.name}</h1>

				<div className='stay-reviews-details'>
					<div className='flex info-start'>
						<div>
							<img className='star-details' src={reviewStar} />
							<span className='avg-top-details'>{avg}</span>
							<span className='dot-before-reviews'>·</span>
							<a href='#reviews' className='reviews-count-details'>
								{stay.reviews.length} reviews
							</a>
							<span className='dot-before-address'>·</span>
							<a href='#map' className='stay-location-href'>
								<span className='stay-location-details'>{stay.loc.address}</span>
								<span>, </span>
								<span className='stay-location-country'> {stay.loc.country}</span>
							</a>
						</div>
						<div className='flex share-save'>
							<div>Share</div>
							<img className='heart-details' src={greyHeart} />
							<div>Save</div>
						</div>
					</div>
				</div>

				<div className='details-img-container'>
					<img className='main-img' src={stay.imgUrls[0]} alt='' />
					<img className='small-img' src={stay.imgUrls[1]} alt='' />
					<img className='small-img corner-top' src={stay.imgUrls[2]} alt='' />
					<img className='small-img' src={stay.imgUrls[3]} alt='' />
					<img className='small-img corner-bottom' src={stay.imgUrls[4]} alt='' />
				</div>
				<div className='stay-info-container'>
					<div className='stay-info'>
						<div className='host-info flex'>
							<div>
								<h2>
									{stay.type} hosted by <span className='host-name'>{stay.host.fullname}</span>
								</h2>
								<ul className='stay-baths-beds flex'>
									<div>{stay.capacity} guests</div>
									<span className='dot'>·</span>
									<div>{stay.capacity - 1} beds</div>
									<span className='dot'>·</span>
									<div>{parseInt(stay.capacity / 2)} baths</div>
								</ul>
							</div>
							<img className='mini-host-img' src={stay.host.imgUrl} />
						</div>
						<ul className='stay-main-amenities-list'>
							<li className='flex'>
								<img className='stay-main-amenities' src={home} />
								<div>
									<h3>Entire home</h3>
									<p>You will have the {stay.type.toLowerCase()} to yourself.</p>
								</div>
							</li>
							<li className='flex'>
								<img className='stay-main-amenities' src={clean} />
								<div>
									<h3>Enhanced clean</h3>
									<p>This Host committed to Airbnb's 5-step enhanced cleaning process.</p>
								</div>
							</li>
							<li className='flex'>
								<img className='stay-main-amenities' src={checkin} />
								<div>
									<h3>Self check-in</h3>
									<p>Check yourself in with the lockbox.</p>
								</div>
							</li>
						</ul>
						<p className={"stay-summery"}>{stay.summary}</p>
						<Amenities amenities={stay.amenities} />
					</div>
					<Checkout avg={avg} stay={stay} />
				</div>
				<div id='reviews' className='reviews-header flex'>
					<img src={reviewStar} />
					<span>{avg}</span>
					<div>({stay.reviews.length} Reviews)</div>
				</div>
				<div className='reviews-container'>
					{stay.reviews.map((review, idx) => {
						return <Review key={review + idx} review={review} avg={avg} />;
					})}
				</div>
				<Map lat={stay.loc.lat} lng={stay.loc.lng} name={stay.name} country={stay.loc.country} address={stay.loc.address} />
			</div>
		</main>
	);
}

function mapStateToProps({}) {
	return {};
}
const mapDispatchToProps = {
	toggleDetailsLayout,
};

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails);
