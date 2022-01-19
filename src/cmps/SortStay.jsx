import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import { setFilterBy } from "../store/stay.action.js";

// import React from 'react';

export function _SortStay({ setFilterBy }) {

    const [filterBy, setFilter] = useState({
        wifi: false,
        tv: false,
        kitchen: false,
        aircon: false,
        smoking: false,
        pets: false
    })

    useEffect(async () => {
        await setFilterBy(filterBy)
    }, [filterBy])



    return (<div><h1>Sort Stays</h1>
        <button>Price</button>
        <button>Type of place</button>
        <button onClick={() => { setFilter({ ...filterBy, wifi: !filterBy.wifi }) }}>Wifi</button>
        <button onClick={() => { setFilter({ ...filterBy, tv: !filterBy.tv }) }}>TV</button>
        <button onClick={() => { setFilter({ ...filterBy, kitchen: !filterBy.kitchen }) }}>Kitchen</button>
        <button onClick={() => { setFilter({ ...filterBy, aircon: !filterBy.aircon }) }}>AC</button>
        <button onClick={() => { setFilter({ ...filterBy, smoking: !filterBy.smoking }) }}>Smoking Allowed</button>
        <button onClick={() => { setFilter({ ...filterBy, pets: !filterBy.pets }) }}>Pets Allowed</button>
    </div>
    )

}

function mapStateToProps({ stayModule }) {
    return {
        filterBy: stayModule.filterBy,
    };
}
const mapDispatchToProps = {
    // loadStays,
    setFilterBy
};

export const SortStay = connect(mapStateToProps, mapDispatchToProps)(_SortStay);
