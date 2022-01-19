import { SpecialButton } from "./SpacialButton";
export function Checkout() {
	return (
		<main className='spacial-btn'>
			<section class='order-container'>
				<div class='order-form-header'>
					<p>
						<span class='cost'>$150</span> / night
					</p>
					<p>
						4.38 <span class='reviews'>(4 reviews)</span>
					</p>
				</div>

				<div class='order-data'>
					<div class='date-picker'>
						<div class='date-input'>
							<label>check in</label>
							<input placeholder='Tue Sep 07 2021'></input>
						</div>
						<div class='date-input'>
							<label>check out</label>
							<input placeholder='Tue Sep 07 2021'></input>
						</div>
					</div>

					<div class='guest-input'>
						<label>guests</label>
						<input placeholder='2'></input>
					</div>
				</div>
				<SpecialButton text='Check availability' />
			</section>
			<p class='footer'>Report this listing</p>
		</main>
	);
}
