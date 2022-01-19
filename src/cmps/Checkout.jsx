import { SpecialButton } from "./SpacialButton";
export function Checkout() {
	return (
		<main className='spacial-btn checkout-container'>
			<section className='order-container'>
				<div className='order-form-header'>
					<p>
						<span className='cost'>$150</span> / night
					</p>
					<p>
						4.38 <span className='reviews'>(4 reviews)</span>
					</p>
				</div>

				<div className='order-data'>
					<div className='date-picker'>
						<div className='date-input'>
							<label>check in</label>
							<input placeholder='Tue Sep 07 2021'></input>
						</div>
						<div className='date-input'>
							<label>check out</label>
							<input placeholder='Tue Sep 07 2021'></input>
						</div>
					</div>

					<div className='guest-input'>
						<label>guests</label>
						<input placeholder='2'></input>
					</div>
				</div>
				<SpecialButton text='Check availability' />
			</section>
		</main>
	);
}
