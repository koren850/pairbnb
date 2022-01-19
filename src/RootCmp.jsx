import React from "react";
import { Route, Switch } from "react-router";

import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import { Home } from "./pages/Home.jsx";
import { Explore } from "./pages/Explore.jsx";

export function RootCmp() {
	return (
		<div>
			<AppHeader />
			<main>
				<Switch>
					<Route component={Explore} path='/explore' />
					<Route component={Home} path='/' />
				</Switch>
			</main>
			<AppFooter />
		</div>
	);
}
