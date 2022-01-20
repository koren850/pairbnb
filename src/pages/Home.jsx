import React from "react";
import jerusalemImg from "../styles/img/jerusalem.jpg"
import dubaiImg from "../styles/img/dubai.jpg"
import vegasImg from "../styles/img/vegas.jpeg"
import parisImg from "../styles/img/paris.jpg"
import { Loader } from "../cmps/Loader";

export function Home() {
	return <main className="home main-layout">
		<Loader/>
			<section className="hero full-layout">
		<img src='https://res.cloudinary.com/dqj9g5gso/image/upload/v1642610299/imgs/HD_wallpaper__brown_wooden_dock_and_cottages_Maldives_resort_artificial_lights_zxkna8.jpg'/>
		<h1 className="hero-title">Not sure where to go? Perfect.</h1>
			</section>
		<section className="popular-cities middle-layout">
		<article className="city-container">
				<img src={parisImg}/>
				<h1>Paris</h1>
				{/* <p>France</p> */}
			</article>
			<article className="city-container">
				<img src={jerusalemImg}/>
				<h1>Jerusalem</h1>
				{/* <p>Israel</p> */}
			</article>
			<article className="city-container">
				<img src={dubaiImg}/>
				<h1>Dubai</h1>
				{/* <p>Saudi Arabia</p> */}
			</article>
			<article className="city-container">
				<img src={vegasImg}/>
				<h1>Las Vegas</h1>
				{/* <p>U.S.A</p> */}
			</article>
		</section>
	</main>;
}
