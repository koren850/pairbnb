import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { StayList } from "../cmps/Explore/StayList.jsx";
import { AddStay } from "../cmps/BackOffice/AddStay.jsx";
import { loadStays } from "../store/stay.action.js";
import { Table } from "../cmps/BackOffice/OrderTables";

import { userService } from "../services/user.service";
import { stayService } from "../services/stay.service";

import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const colors = {
	bnb: "#FF385C",
	grey: "#ebebeb",
	white: "#FFFFFF",
};

const Tab = styled(TabUnstyled)`
	font-family: IBM Plex Sans, sans-serif;
	color: ${colors.bnb};
	cursor: pointer;
	font-size: 0.875rem;
	font-weight: bold;
	background-color: transparent;
	width: 100%;
	padding: 12px 16px;
	margin: 6px 6px;
	border: none;
	border-radius: 5px;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: ${colors.grey};
	}

	&:focus {
		color: #fff;
		border-radius: 3px;
		outline: 2px solid ${colors.grey};
		outline-offset: 2px;
	}

	&.${tabUnstyledClasses.selected} {
		background-color: ${colors.bnb};
		color: ${colors.white};
	}

	&.${buttonUnstyledClasses.disabled} {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const TabPanel = styled(TabPanelUnstyled)`
	width: 100%;
	font-family: IBM Plex Sans, sans-serif;
	font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
	min-width: 320px;
	background-color: ${colors.white};
	border-radius: 8px;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: space-between;
`;

export function _BackOffice({ stays, loadStays }) {
	const [hostStays, setHostStays] = useState([]);
	useEffect(async () => {
		let loggedInUser = userService.getLoggedinUser();
		let stays = await stayService.getStaysByHostId(loggedInUser._id);
		console.log(stays);
		setHostStays([...stays]);
	}, []);

	return (
		<div className='main-layout main-container'>
			<TabsUnstyled className='middle-layout' defaultValue={0}>
				<TabsList>
					<Tab>ORDERS</Tab>
					<Tab>MY STAYS</Tab>
					<Tab>ADD A STAY</Tab>
				</TabsList>
				<TabPanel value={0}>
					<Table />
				</TabPanel>
				<TabPanel value={1}>{hostStays.length ? <StayList fromBackOffice={true} staysToShow={hostStays} /> : <div>Loader</div>}</TabPanel>
				<TabPanel value={2}>
					<AddStay />
				</TabPanel>
			</TabsUnstyled>
		</div>
	);
}

function mapStateToProps({ stayModule }) {
	return {
		stays: stayModule.stays,
		// staysToShow: stayModule.staysToShow,
	};
}
const mapDispatchToProps = {
	loadStays,
	// toggleIsExplore,
	// toggleHeaderIsTop,
	// toggleHeaderIsActive,
};

export const BackOffice = connect(mapStateToProps, mapDispatchToProps)(_BackOffice);

// function TabPanel(props) {
// 	const { children, value, index, ...other } = props;

// 	return (
// 		<div role='tabpanel' hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
// 			{value === index && (
// 				<Box sx={{ p: 3 }}>
// 					<Typography>{children}</Typography>
// 				</Box>
// 			)}
// 		</div>
// 	);
// }

// TabPanel.propTypes = {
// 	children: PropTypes.node,
// 	index: PropTypes.number.isRequired,
// 	value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
// 	return {
// 		id: `full-width-tab-${index}`,
// 		"aria-controls": `full-width-tabpanel-${index}`,
// 	};
// }

// export function BackOffice() {
// 	const theme = useTheme();
// 	const [value, setValue] = React.useState(0);

// 	const handleChange = (event, newValue) => {
// 		setValue(newValue);
// 	};

// 	const handleChangeIndex = (index) => {
// 		setValue(index);
// 	};

// 	return (
// 		<div className='main-layout main-container'>
// 			<Box className='middle-layout' sx={{ bgcolor: "background.paper", width: 500 }}>
// 				<AppBar position='static'>
// 					<Tabs value={value} onChange={handleChange} indicatorColor='secondary' textColor='inherit' variant='fullWidth' aria-label='full width tabs example'>
// 						<Tab label='ORDERS' {...a11yProps(0)} />
// 						<Tab label='MY STAYS' {...a11yProps(1)} />
// 						<Tab label='ADD A STAY' {...a11yProps(2)} />
// 					</Tabs>
// 				</AppBar>
// 				<SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
// 					<TabPanel value={value} index={0} dir={theme.direction}>
// 						Item One
// 					</TabPanel>
// 					<TabPanel value={value} index={1} dir={theme.direction}>
// 						Item Two
// 					</TabPanel>
// 					<TabPanel value={value} index={2} dir={theme.direction}>
// 						Item Three
// 					</TabPanel>
// 				</SwipeableViews>
// 			</Box>
// 		</div>
// 	);
// }
