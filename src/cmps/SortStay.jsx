import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import { setFilterBy } from "../store/stay.action.js";

// import React from 'react';

export function _SortStay({ setFilterBy }) {

    const [filterBy, setFilter] = useState({
        "Wifi": false,
        "TV": false,
        "Kitchen": false,
        "Air conditioning": false,
        "Smoking allowed": false,
        "Pets allowed": false
    })

    useEffect(async () => {
        await setFilterBy(filterBy)
    }, [filterBy])



    return (<div className="middle-layout"><h1>Sort Stays</h1>
        <button>Price</button>
        <button>Type of place</button>
        <button onClick={() => { setFilter({ ...filterBy, "Wifi": !filterBy["Wifi"] }) }}>Wifi</button>
        <button onClick={() => { setFilter({ ...filterBy, "TV": !filterBy["TV"] }) }}>TV</button>
        <button onClick={() => { setFilter({ ...filterBy, "Kitchen": !filterBy["Kitchen"] }) }}>Kitchen</button>
        <button onClick={() => { setFilter({ ...filterBy, "Air conditioning": !filterBy["Air conditioning"] }) }}>AC</button>
        <button onClick={() => { setFilter({ ...filterBy, "Smoking allowed": !filterBy["Smoking allowed"] }) }}>Smoking Allowed</button>
        <button onClick={() => { setFilter({ ...filterBy, "Pets allowed": !filterBy["Pets allowed"] }) }}>Pets Allowed</button>
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
