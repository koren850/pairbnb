import React, { useState } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export function Table() {
	const [responsive, setResponsive] = useState("scroll");
	const [tableBodyHeight, setTableBodyHeight] = useState("");
	const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

	function update(test) {
		console.log(test);
		// setResponsive(test);
	}

	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	const columns = ["Name", "Title", "Location"];

	const options = {
		filter: true,
		filterType: "dropdown",
		responsive,
		tableBodyHeight,
		tableBodyMaxHeight,
	};

	const data = [
		["Gabby George", "Business Analyst", "Minneapolis"],
		["Aiden Lloyd", "Business Consultant for an International Company and CEO of Tony's Burger Palace", "Dallas"],
		["Jaden Collins", "Attorney", "Santa Ana"],
		["Franky Rees", "Business Analyst", "St. Petersburg"],
		["Aaren Rose", null, "Toledo"],
		["Johnny Jones", "Business Analyst", "St. Petersburg"],
		["Jimmy Johns", "Business Analyst", "Baltimore"],
		["Jack Jackson", "Business Analyst", "El Paso"],
		["Joe Jones", "Computer Programmer", "El Paso"],
		["Jacky Jackson", "Business Consultant", "Baltimore"],
		["Jo Jo", "Software Developer", "Washington DC"],
		["Donna Marie", "Business Manager", "Annapolis"],
	];

	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>Responsive Option</InputLabel>
				</FormControl>
				<MUIDataTable title={"ACME Employee list"} data={data} columns={columns} options={options} />
			</React.Fragment>
		</ThemeProvider>
	);
}
