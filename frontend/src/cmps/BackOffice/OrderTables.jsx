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
					<button style={{ padding: "8px", color: "green" }} onClick={() => setCurrOrderClick({ order, idx, status: "approved" })}>
						approved
					</button>
					<button style={{ padding: "8px", color: "red" }} onClick={() => setCurrOrderClick({ order, idx, status: "declined" })}>
						decline
					</button>
				</div>
			);
			approvedButtons = (
				<button style={{ padding: "8px", margin: "auto" }} onClick={() => setCurrOrderClick({ order, idx, status: "remove" })}>
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
		console.log(orders);
		const pending = orders.filter((order) => order[5] === "pending");
		return pending.length;
	}
	function getTotalEarning(orders) {
		let price = 0;
		const approved = orders.filter((order) => order[5] === "approved");

		let prices = approved.forEach((order) => {
			let currPrice = order[4].replace("$", "");
			price += +currPrice;
		});
		return price.toFixed(1);
		// return .length;
	}
	function getOrderTypes(orders, type) {
		let ammount = 0;
		orders.forEach((order) => {
			if (order[5] === type) ammount++;
		});
		return `${ammount}/${orders.length}`;
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

	const tableHeader = (
		<div className='table-header'>
			<h2>
				Hi {loggedinUser.fullName}, your have {getPendingOrders(myOrders)} pending orders
			</h2>
			<div>
				<div className='orders-types flex'>
					<div>Orders:</div>
					<span>
						{getOrderTypes(myOrders, "approved")}
						<div style={{ backgroundColor: "#9df89d" }} className='orders-ball'></div>
						(Approved)
					</span>
					<span>
						{getOrderTypes(myOrders, "pending")}
						<div style={{ backgroundColor: "#faf87b" }} className='orders-ball'></div>
						(Pending)
					</span>
					<span>
						{getOrderTypes(myOrders, "declined")}
						<div style={{ backgroundColor: "#fa7b7b" }} className='orders-ball'></div>
						(Declined)
					</span>
				</div>
				<div>
					<span>Total earning: ${getTotalEarning(myOrders)}</span>
				</div>
			</div>
		</div>
	);

	return (
		<ThemeProvider theme={theme}>
			<MUIDataTable title={tableHeader} data={myOrders} columns={columns} options={options} />
		</ThemeProvider>
	);
}
