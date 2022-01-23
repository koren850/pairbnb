import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import { LogIn } from "../cmps/LogIn";
import { SignUp } from "../cmps/SignUp";
import { signingUp, signingIn } from "../store/user.action";
import { Loader } from "../cmps/Loader";
import { useState } from "react";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

function _UserLogin({ signingUp, signingIn, history }) {
	const [isSubmitting, setIsSubmitting] = useState(false);


	const theme = createTheme({
		palette: {
		  primary: {
			main: "#ff8f00"
		  },
		  secondary: {
			main: "#ffcc80"
		  }
		}
	  });
	
	if (isSubmitting) return <Loader />;
	return (
		<section style={{ marginBlockStart: "140px",marginBlockEnd: "60px" }}>
			<Switch>
			<ThemeProvider theme={theme}>
				<Route component={() => <LogIn setIsSubmitting={setIsSubmitting} signingIn={signingIn} history={history} />} path='/user/login' />
				<Route component={() => <SignUp setIsSubmitting={setIsSubmitting} signingUp={signingUp} history={history} />} path='/user/signup' />
			</ThemeProvider>,
			</Switch>
		</section>
	);
}

function mapStateToProps({ userModule }) {
	return {
		user: userModule.user,
	};
}
const mapDispatchToProps = {
	signingUp,
	signingIn,
};

export const UserLogin = connect(mapStateToProps, mapDispatchToProps)(_UserLogin);
