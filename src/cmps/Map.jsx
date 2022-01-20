import React from "react";
import { useState } from "react";
import ApiKeys from "../api-key.json";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import home from "../styles/svg/home.svg";

const containerStyle = {
	width: "1120px",
	height: "400px",
};
export function Map({ lat, lng, name, country, address }) {
	const [center, setCenter] = useState({ lat, lng });
	const [isInfoWindowOpen, setInfo] = useState(false);
	return (
		<section className='map-section'>
			<LoadScript googleMapsApiKey={ApiKeys.maps}>
				<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
					<div className='marker'>
						<Marker
							onClick={() => {
								setCenter({ lat, lng });
								setInfo(!isInfoWindowOpen);
							}}
							name={"Current location"}
							position={center}
							icon={home}
							title={name}
						/>
					</div>

					{isInfoWindowOpen && (
						<InfoWindow position={{ lat: center.lat, lng: center.lng }}>
							<div>
								<h1>Country: {country}</h1>
								<h1>Address: {address}</h1>
								<h1>Name: {name}</h1>
							</div>
						</InfoWindow>
					)}
				</GoogleMap>
			</LoadScript>
		</section>
	);
}
