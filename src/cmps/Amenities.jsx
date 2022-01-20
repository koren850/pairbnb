export function Amenities({ amenities }) {
	const labels = [];
	const NotIncluded = [];
	amenities.forEach((amenitie) => {
		const [values] = Object.values(amenitie);
		if (amenitie["Not included"]) {
			values.forEach((label) => NotIncluded.push(label));
			return;
		}
		values.forEach((label) => labels.push(label));
	});

	return (
		<div>
			<h1>What this place offers</h1>
			<ul className='amenities-list'>
				{labels.map((amenitie) => {
					return <li>{amenitie}</li>;
				})}
				{NotIncluded.map((amenitie) => {
					return <li className='not-included'>{amenitie}</li>;
				})}
			</ul>
		</div>
	);
}
