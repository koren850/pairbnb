import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RangeSlider from "./PriceFilterCmps/RangeSlider";
import Histogram from "./PriceFilterCmps/Histogram";
import RangeInput from "./PriceFilterCmps/RangeInput";
import { stayService } from "../../../services/stay.service.js"

const DIV = styled.div`
  padding: 15px;
  canvas {
    height: 250px !important;
  }
`;

const SPACE = styled.div`
  height: 50px;
`;

export function PriceFilter({ stays }) {
    let ranges = stayService.getDataForPrice(stays)
    const sample = {
        type: "price",
        max: 1000,
        min: 0, 
        range: ranges
    }
    console.log(sample)
    const responseData = sample.range;
    const maxData = sample.max;
    const countData = [];
    const priceData = [];

    for (let i = 0; i < responseData.length; i += 1) {
        const thisPrice = responseData[i].from ? responseData[i].from : 0;
        const thisCount = responseData[i].stay_count;
        countData.push(thisCount || 0);
        priceData.push(thisPrice || 0);
    }
    countData[countData.length] = countData[countData.length - 1];
    priceData[priceData.length] = maxData;
    console.log(countData)

    const range = [0, countData.length - 1];
    const domain = range; // defulat value
    const defaultInputValue = [
        Number(priceData[0]),
        Number(priceData[priceData.length - 1])
    ];

    // console.log(countData.length);
    const [updateValue, setUpdateValue] = useState(domain);
    const [inputValue, setInputValue] = useState(defaultInputValue);
    console.log('3')

    const onUpdateCallBack = v => {
        setUpdateValue(v);
        // console.log(v);
        setInputValue([].concat(Number(priceData[v[0]]), Number(priceData[v[1]])));
    };

    const onChangeCallBack = v => {
        setUpdateValue(v);
        // console.log(Number(priceData[v[0]]), Number(priceData[v[1]]));
        // console.log(v);
        setInputValue([].concat(Number(priceData[v[0]]), Number(priceData[v[1]])));
    };

    console.log(range);

    const handleInputChange = v => {
        let updateAry = domain;
        for (let i = 0; i < priceData.length; i += 1) {
            if (Number(priceData[i]) > v[0]) {
                updateAry[0] = i - 1;
                break;
            }
        }
        for (let i = 0; i < priceData.length; i += 1) {
            if (Number(priceData[i]) > v[1]) {
                updateAry[1] = i;
                break;
            } else {
                updateAry[1] = priceData.length;
            }
        }
        setUpdateValue([].concat(updateAry));
    };

    const resetFn = () => {
        setUpdateValue(domain);
        setInputValue(defaultInputValue);
    };

    // console.log(countData = )
   const countData1= [5465, 171, 660, 4292, 1376, 143, 1167, 1016, 873, 471, 529, 528, 480, 326, 324, 280, 224, 249, 173, 2523, 2523]
   const updateValue1=[0, 20]
   const domain1=[0, 20]
    useEffect(() => {
        // console.log(inputValue);
    }, [inputValue]);
    console.log(updateValue)
    console.log(domain)
    return (
        <DIV>
            <Histogram data={countData1} highlight={updateValue1} domain={domain1} />
            <RangeSlider
                values={updateValue}
                mode={2}
                step={1}
                domain={domain}
                onChange={onChangeCallBack}
                onUpdate={onUpdateCallBack}
            />
            <SPACE />
            <RangeInput inputRange={inputValue} onChange={handleInputChange} />
            <button onClick={resetFn}>Reset</button>
        </DIV>
    );
}

