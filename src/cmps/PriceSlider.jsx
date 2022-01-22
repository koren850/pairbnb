// import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { setByRange } from "../store/stay.action.js";

import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";


function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
            <div>Helllloooo</div>
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
};


// const marks = [
//     {
//         value: 100,
//     },
//     {
//         value: 200,
//     },
//     {
//         value: 370,
//     },
//     {
//         value: 600,
//     },
// ];

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#FF385C',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
};

export function _PriceSlider({ stays, setByRange, filterBy, stayType }) {

    const [stayPrice, setPriceRange] = useState({
        minPrice: 0,
        maxPrice: 1000,
    });

    const handleChange = (event) => {
        let priceRange = event.target.value
        setPriceRange({ minPrice: priceRange[0], maxPrice: priceRange[1] })
    };

    useEffect(async () => {
        await setByRange(filterBy, stayType, stayPrice)
    }, [stayPrice])

    // const marks = stays.map(stay => {
    //     return {value:stay.price}
    // })

    let maxPrice = 1000
    let minPrice = 0
    const stayPrices = stays.map(stay => {
        if (stay.price > maxPrice) maxPrice = stay.price
        if (stay.price < minPrice) minPrice = stay.price

        return stay.price
    })


    return (
        <section className="price-filter-container">
            <Box sx={{ width: 285 }}>
                <Box sx={{ m: 3 }} />
                {/* <Typography gutterBottom>Airbnb</Typography> */}
                <AirbnbSlider
                    min={minPrice}
                    name="priceRange"
                    max={maxPrice}
                    onChange={(ev) => handleChange(ev)}
                    // marks={marks}
                    // value={500}
                    components={{ Thumb: AirbnbThumbComponent }}
                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                    defaultValue={[0, 1000]}
                />
                <div className="price-range flex">
                    <div className="minmax-price">
                        <div className="min-price">Min Price</div>
                        <div className="min-price">${stayPrice.minPrice}</div>
                    </div>
                    <div className="minmax-price">
                        <div className="max-price">Max Price </div>
                        <div className="max-price">${stayPrice.maxPrice}</div>
                    </div>
                </div>


            </Box>
        </section>
    );
}

function mapStateToProps({ stayModule }) {
    return {
        stayType: stayModule.stayType,
        filterBy: stayModule.filterBy,
        stays: stayModule.stays,
        stayPrice: stayModule.stayPrice
    };
}
const mapDispatchToProps = {
    setByRange,
};

export const PriceSlider = connect(mapStateToProps, mapDispatchToProps)(_PriceSlider);


