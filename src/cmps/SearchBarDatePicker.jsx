import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';

export function SearchBarDatePicker({ChooseDates}) {
    
    const [value, setValue] = React.useState([null, null]);

    React.useEffect(()=>{
        ChooseDates(value)
    },[value])

    console.log()
    const theme = createTheme({
        palette: {
            primary: {
                main: "#FF385C"
            },
            secondary: {
                main: "#FF385C"
            }
        }
    });
    
    return (

            <section className='search-bar-date-picker'>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDateRangePicker
                            displayStaticWrapperAs="desktop"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
            </section>
    );
}