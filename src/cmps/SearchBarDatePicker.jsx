import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base';


export function SearchBarDatePicker({checkInVisible,setCheckInVisible,setCheckOutVisible, checkOutVisible, ChooseDates}) {
    
    const [value, setValue] = React.useState([null, null]);
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

function handleClickAway(){
    console.log('iee')
    setCheckInVisible(false);
    setCheckOutVisible(false)
}
    
    return (
        <React.Fragment>
            {(checkInVisible || checkOutVisible) && <section className='search-bar-date-picker'>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDateRangePicker
                            displayStaticWrapperAs="desktop"
                            value={value}
                            onClickAway={handleClickAway}
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
            </section>}
        </React.Fragment>
    );
}