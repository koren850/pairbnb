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
import { SpecialButton } from './SpacialButton';


const theme = createTheme();

export function SignUp({ setIsSubmitting, signingUp }) {
    const history = useHistory();
    // const [value, setValue] = React.useState(new Date());

    const responseFacebook = (response) => {
        const credentials = {
            fullName: response.name,
            email: response.email,
            imgSrc: response.picture.data.url
        }
        console.log(credentials, "וואלה מגניב רצח הא?");
        signingUp(credentials);
        setTimeout(() => {
            setIsSubmitting(true);
            history.push('/');
        }, 2000)
    }

    const responseGoogle = (response) => {
        const credentials = {
            fullName: response.profileObj.name,
            email: response.profileObj.email,
            imgSrc: response.profileObj.imageUrl
        }
        console.log(credentials, "וואלה מגניב רצח הא?");
        setIsSubmitting(true);
        setTimeout(() => {
            signingUp(credentials);
            history.push('/');
        }, 2000)
    }

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const credentials = {
            fullname: data.get('fullName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log(credentials)
        setIsSubmitting(true);
        setTimeout(()=>{
            signingUp(credentials);
            history.push('/');
        },2000)
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
                        <button style={{marginBlockStart:'10px',backgroundColor:'transparent',width:'100%',height:'40px',border:'none'}}>
                        <div className='spacial-btn'>
                        <SpecialButton onClick={handleSubmit} size={{width:'inherit',height:'40px'}} text={'Sign Up'}/>
                        </div>
                        </button>
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