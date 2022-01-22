import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from 'react-google-login';


const theme = createTheme();

export function SignUp({ signingUp }) {
    const history = useHistory();
    const [value, setValue] = React.useState(new Date());

    const responseFacebook = (response) => {
        console.log(response);
    }

    const responseGoogle = (response) => {
        console.log(response.profileObj);
    }

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const userInfo = {
            fullname: data.get('firstName') + ' ' + data.get('lastName'),
            username: data.get('firstName') + data.get('lastName'),
            bdate: value,
            email: data.get('email'),
            password: data.get('password'),
        }
        signingUp(userInfo);
        history.push('/');
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'inherit' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fullName"
                                    name="fullName"
                                    label="Full Name"
                                    type="fullName"
                                    autoComplete="full-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="Phone Number"
                                    type="number"
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="new-email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{backgroundColor:'#FF385C'}}
                            // sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <GoogleLogin
                            scope="profile email"
                            redirect_uri="https://localhost:3000/user/login"
                            clientId="490177482976-lt2ap2i9ei79difra3envh2b1g1528bn.apps.googleusercontent.com"
                            buttonText="Login with Google acccount"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            render={renderProps => (
                                <GoogleLoginButton style={{ display: 'flex', justifyContent: 'center', height: '35px', margin: '10px 0', width: '396px' }} onClick={renderProps.onClick} disabled={renderProps.disabled}>SignUp with Google</GoogleLoginButton>
                            )}
                            cookiePolicy={'single_host_origin'}
                        />

                        <FacebookLogin
                            appId="960690547913550"
                            autoLoad={true}
                            fields="name,email,picture"
                            render={renderProps => (
                                <FacebookLoginButton style={{ display: 'flex', justifyContent: 'center', height: '35px', margin: '10px 0', width: '396px' }} onClick={renderProps.onClick} disabled={renderProps.disabled}>SignUp with Facebook</FacebookLoginButton>
                            )}
                            callback={responseFacebook} />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/user/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}