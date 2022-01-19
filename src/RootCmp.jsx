import React from "react";
import { Route, Switch } from "react-router";

import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { StayDetails } from "./pages/StayDetails";

export function RootCmp() {
	return (
		<div className="app-layout">
			<AppHeader />
			<main className="main-app-layout">
				<Switch>
					<Route component={Explore} path='/explore' />
					<Route component={StayDetails} path='/details/:id' />
					<Route component={Home} path='/' />
				</Switch>
			</main>
			<AppFooter />
		</div>
	);
}
