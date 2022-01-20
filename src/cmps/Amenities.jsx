export function Amenities({ amenities }) {
	const labels = [];
	amenities.forEach((amenitie) => {
		const [values] = Object.values(amenitie);
		values.forEach((label) => labels.push(label));
	});

	return (
		<div>
			<h1>What this place offers</h1>
			<ul className='amenities-list'>
				{labels.map((amenitie) => {
					return <li>{amenitie}</li>;
				})}
			</ul>
		</div>
	);
}
