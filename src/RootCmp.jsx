import React from "react";
import { Route, Switch } from "react-router";
import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { StayDetails } from "./pages/StayDetails";
import { UserLogin } from "./pages/UserLogin";

export function RootCmp() {
	return (
		<div className="app-layout">
			<AppHeader />
			<main className="main-app-layout">
				<Switch>
					<Route component={Explore} path='/explore/:search?' />
					{/* field1=value1&field1=value2&field1=value3.. */}
					<Route component={UserLogin} path='/user/' />
					<Route component={StayDetails} path='/details/:id' />
					<Route component={Home} path='/' />
				</Switch>
			</main>
			<AppFooter />
		</div>
	);
}
