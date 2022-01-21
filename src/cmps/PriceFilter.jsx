import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography } from "@material-ui/core";

import RangeSlider from "./PriceFilterCmps/RangeSlider.js";

const prices = [];
for (let i = 0; i < 500; i++) {
    prices.push(Math.floor(Math.random() * 80) + 1);
}

export function PriceFilter() {
    return (
        <Grid container justify="center" style={{ marginTop: "33px" }}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant="h5">A Range Slider with Histogram</Typography>
            </Grid>
            <Grid item xs={12} lg={8}>
                <RangeSlider data={prices} />
            </Grid>
        </Grid>
    );
}

