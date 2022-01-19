import React, { useEffect, useState } from "react";
import { stayService } from "../services/stay.service";

export function StayDetails({ match }) {
	const [stay, setStay] = useState(null);

	useEffect(async () => {
		const stayByid = await stayService.getById(match.params.id);
		console.log(stayByid);
		setStay(stayByid);
	}, []);

	if (!stay) return <div>Loading...</div>;
	return (
		<main className='main-layout'>
			<div className='middle-layout'>
				<h1>{stay.name}</h1>
				<h3>{stay.loc.address}</h3>
				<div className='details-img-container'>
					<img className='main-img' src={stay.imgUrls[0]} alt='' />
					<img className='small-img' src={stay.imgUrls[1]} alt='' />
					<img className='small-img' src={stay.imgUrls[2]} alt='' />
					<img className='small-img' src={stay.imgUrls[4]} alt='' />
					<img className='small-img' src={stay.imgUrls[5]} alt='' />
				</div>
			</div>
		</main>
	);
}
