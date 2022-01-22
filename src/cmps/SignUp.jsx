import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from "react-google-login";
import { SpecialButton } from "./SpacialButton";
import { useDispatch, useSelector } from "react-redux";
import { updateInputsErrorInfo } from "../store/user.action";

const theme = createTheme();

export function SignUp({ setIsSubmitting, signingUp }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const connectionError = useSelector(state => state.userModule.connectionError);

	const responseFacebook = (response) => {
		const credentials = {
			fullName: response.name,
			email: response.email,
			imgSrc: response.picture.data.url,
			isSocial: true,
		};
		signingUp(credentials);
		setIsSubmitting(true);
		setTimeout(async () => {
			try {
				await signingUp(credentials);
			}
			catch (err) {
				setIsSubmitting(false);
				dispatch(updateInputsErrorInfo(err))
				console.log(connectionError)
				return;
			}
			history.push("/");
		}, 2000);
	};

	const responseGoogle = (response) => {
		const credentials = {
			fullName: response.profileObj.name,
			email: response.profileObj.email,
			imgSrc: response.profileObj.imageUrl,
			isSocial: true,
		};
		setIsSubmitting(true);
		setTimeout(async () => {
			try {
				await signingUp(credentials);
			}
			catch (err) {
				setIsSubmitting(false);
				dispatch(updateInputsErrorInfo(err))
				return;
			}
			history.push("/");
		}, 2000);
	};

	// const handleChange = (newValue) => {
	//     setValue(newValue);
	// };

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const credentials = {
			fullName: data.get("fullName"),
			email: data.get("email"),
			password: data.get("password"),
		};
		console.log(credentials);
		setIsSubmitting(true);
		setTimeout(async () => {
			try {
				await signingUp(credentials);
			}
			catch (err) {
				setIsSubmitting(false);
				dispatch(updateInputsErrorInfo(err))
				return;
			};
			history.push("/");
		}, 2000);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={0}>
							<Grid item xs={12}>
							<TextField
							onChange={() => {connectionError.fullName && dispatch(updateInputsErrorInfo({ reason: '', unsolved:'userName' }))}}
							 required fullWidth name='fullName' label='Full Name' type='fullName' id='fullName' autoComplete='current-fullName' />
						<input type='text' value={connectionError.fullName} readOnly style={{ marginInlineStart: '10px', color: 'red', border: 'unset' }} />

							<TextField
							onChange={() => {connectionError.email && dispatch(updateInputsErrorInfo({ reason: '', unsolved:'email' }))}}
							 required fullWidth name='email' label='E-mail' type='email' id='email' autoComplete='current-email' />
						<input type='text' value={connectionError.email} readOnly style={{ marginInlineStart: '10px', color: 'red', border: 'unset' }} />
							</Grid>
							<Grid item xs={12}>
						<TextField onChange={() => {connectionError.password &&  dispatch(updateInputsErrorInfo({ reason: '', unsolved: 'password' }))
						}}  required fullWidth name='password' label='Password' type='password' id='password' autoComplete='current-password' />
						<input type='text' value={connectionError.password} readOnly style={{ marginInlineStart: '10px', color: 'red', border: 'unset' }} />
							</Grid>
						</Grid>
						<button style={{ marginBlockStart: "10px", backgroundColor: "transparent", width: "100%", height: "40px", border: "none" }}>
							<div className='spacial-btn'>
								<SpecialButton size={{ width: "inherit", height: "40px" }} text={"Sign Up"} />
							</div>
						</button>
						<GoogleLogin
							scope='profile email'
							redirect_uri='https://localhost:3000/user/login'
							clientId='490177482976-lt2ap2i9ei79difra3envh2b1g1528bn.apps.googleusercontent.com'
							buttonText='Login with Google acccount'
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							render={(renderProps) => (
								<GoogleLoginButton
									style={{ display: "flex", justifyContent: "center", height: "35px", margin: "10px 0", width: "396px" }}
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}>
									SignUp with Google
								</GoogleLoginButton>
							)}
							cookiePolicy={"single_host_origin"}
						/>

						<FacebookLogin
							appId='960690547913550'
							fields='name,email,picture'
							render={(renderProps) => (
								<FacebookLoginButton
									style={{ display: "flex", justifyContent: "center", height: "35px", margin: "10px 0", width: "396px" }}
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}>
									SignUp with Facebook
								</FacebookLoginButton>
							)}
							callback={responseFacebook}
						/>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link to='/user/login'>Already have an account? Sign in</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
