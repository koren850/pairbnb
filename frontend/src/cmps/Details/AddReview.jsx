import React, { useState } from "react";
import Rating from "@mui/material/Rating";

import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const labels = {
	0.5: "Useless",
	1: "Useless+",
	1.5: "Poor",
	2: "Poor+",
	2.5: "Ok",
	3: "Ok+",
	3.5: "Good",
	4: "Good+",
	4.5: "Excellent",
	5: "Excellent+",
};

export function AddReview() {
	const [value, setValue] = React.useState("");
	const types = ["Cleanliness:", "Communication:", "Check-in:", "Accuracy:", "Location:", "Value:"];

	function MultilineTextFields() {}

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const theme = createTheme({
		palette: {
			primary: {
				main: "#FF385C",
			},
			secondary: {
				main: "#FF385C",
			},
		},
	});

	return (
		<div>
			<div className='rating-bars-container'>{types.map((type) => RatingBar(type))}</div>
			<div className='type-area'>
				<ThemeProvider theme={theme}>
					<TextField fullHeight fullWidth label='Share your exprience with this stay' color='secondary' multiline rows={2} maxRows={10} value={value} onChange={handleChange} />
				</ThemeProvider>
			</div>
		</div>
	);
}

function RatingBar(type) {
	const [value, setValue] = React.useState(5);
	const [hover, setHover] = React.useState(-1);
	return (
		<div className='bar-container'>
			<span className='rating-bar-header'>{type}</span>
			<Rating
				name='hover-feedback'
				value={value}
				precision={0.5}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
			/>
		</div>
	);
}
