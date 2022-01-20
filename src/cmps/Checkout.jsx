import * as React from "react";
import addWeeks from "date-fns/addWeeks";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";

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
						<MinMaxDateRangePicker />
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

function getWeeksAfter(date, amount) {
	return date ? addWeeks(date, amount) : undefined;
}
const koko = <button>Clear</button>;
function MinMaxDateRangePicker() {
	const [value, setValue] = React.useState([null, null]);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateRangePicker
				disablePast
				value={value}
				maxDate={getWeeksAfter(value[0], 8)}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				startText='Check-in'
				endText='Check-out'
				renderInput={(startProps, endProps) => (
					<React.Fragment>
						<TextField className={"start-date"} {...startProps} />
						<TextField {...endProps} />
					</React.Fragment>
				)}
			/>
		</LocalizationProvider>
	);
}
