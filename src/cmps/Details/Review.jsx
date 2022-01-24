export function Review({ review }) {
	return (
		<div className='review'>
			<div className='review-user-info flex'>
				<img src={review.by.imgUrl} />
				<h2>{review.by.fullname}</h2>
			</div>
			<p>{review.txt}</p>
		</div>
	);
}
