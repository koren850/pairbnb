import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { Loader } from "../General/Loader";

import { orderService } from "../../services/order.service";
import { userService } from "../../services/user.service";

export function Table() {
	const responsive = "standard";

	const [myOrders, setOrders] = useState(null);
	const [currOrderClicked, setCurrOrderClick] = useState(null);
	const [loggedinUser] = useState(userService.getLoggedinUser());

	let approvedButtons;
	let pendingButtons;

	async function loadOrders() {
		const allOrders = await orderService.query();
		let orders = allOrders.filter((order) => order.hostId === loggedinUser._id);
		orders = orders.map((order, idx) => {
			pendingButtons = (
				<div style={{ display: "flex", gap: "10px" }}>
					<button style={{ padding: "5px", color: "green" }} onClick={() => setCurrOrderClick({ order, idx, status: "approved" })}>
						approved
					</button>
					<button style={{ padding: "5px", color: "red" }} onClick={() => setCurrOrderClick({ order, idx, status: "declined" })}>
						decline
					</button>
				</div>
			);
			approvedButtons = (
				<button style={{ padding: "5px", margin: "auto", color: "orange" }} onClick={() => setCurrOrderClick({ order, idx, status: "remove" })}>
					remove
				</button>
			);
			return [
				order.buyer.fullName,
				order.stay.name,
				order.startDate,
				order.endDate,
				`$${+order.totalPrice}`,
				order.status,
				order.status === "pending" ? pendingButtons : approvedButtons,
			];
		});
		setOrders(orders);
	}

	useEffect(() => {
		loadOrders();
	}, []);

	useEffect(async () => {
		if (!myOrders) return;
		const newOrder = currOrderClicked.order;
		if (currOrderClicked.status === "remove") {
			newOrder.status = currOrderClicked.status;
			await orderService.remove(newOrder._id);
		} else {
			newOrder.status = currOrderClicked.status;
			await orderService.update(newOrder);
		}
		loadOrders();
	}, [currOrderClicked]);

	function decline(id) {
		console.log("decline", id);
	}
	function remove(id) {
		console.log("remove", id);
	}

	function getPendingOrders(orders) {
		const pending = orders.filter((order) => order[5] === "pending");
		return pending.length;
	}

	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	const columns = ["Client name", "Stay name", "Check in", "Check out", "Total", "Order status", "Actions"];

	const options = {
		filter: true,
		filterType: "dropdown",
		responsive,
	};

	if (!myOrders) return <Loader />;
	return (
		<ThemeProvider theme={theme}>
			<MUIDataTable title={`Hi ${loggedinUser.fullName}, your have ${getPendingOrders(myOrders)} pending offers:`} data={myOrders} columns={columns} options={options} />
		</ThemeProvider>
	);
}
