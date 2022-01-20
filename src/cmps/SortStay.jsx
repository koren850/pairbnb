import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { PlaceTypeFilter } from "./PlaceType.jsx"

import { setFilterBy } from "../store/stay.action.js";

// import React from 'react';

export function _SortStay({ setFilterBy, stayType }) {

    const [filterBy, setFilter] = useState({
        "Wifi": false,
        "TV": false,
        "Kitchen": false,
        "Air conditioning": false,
        "Smoking allowed": false,
        "Pets allowed": false
    })
    const [placeType, toggleTypeSearch] = useState()

    useEffect(async () => {
        console.log(filterBy)
        await setFilterBy(filterBy, stayType)
    }, [filterBy])

    useEffect(() => {
        console.log(placeType)
    }, [placeType])

    return (<div className="filter-container middle-layout">
        <button className="filter-btn">Price</button>
        <button className="filter-btn" onClick={() => { toggleTypeSearch(!placeType) }}>{placeType? "Type of place ⇧" : "Type of place ⇩"}</button>
        {placeType && <PlaceTypeFilter />}
        <button className={filterBy["Wifi"] ? "filter-btn-active" : "filter-btn"} onClick={() => { setFilter({ ...filterBy, "Wifi": !filterBy["Wifi"] }) }}>Wifi</button>
        <button className={filterBy["TV"] ? "filter-btn-active" : "filter-btn"} onClick={() => { setFilter({ ...filterBy, "TV": !filterBy["TV"] }) }}>TV</button>
        <button className={filterBy["Kitchen"] ? "filter-btn-active" : "filter-btn"} onClick={() => { setFilter({ ...filterBy, "Kitchen": !filterBy["Kitchen"] }) }}>Kitchen</button>
        <button className={filterBy["Air conditioning"] ? "filter-btn-active" : "filter-btn"} onClick={() => { setFilter({ ...filterBy, "Air conditioning": !filterBy["Air conditioning"] }) }}>AC</button>
        <button className={filterBy["Smoking allowed"] ? "filter-btn-active" : "filter-btn"} onClick={() => { setFilter({ ...filterBy, "Smoking allowed": !filterBy["Smoking allowed"] }) }}>Smoking Allowed</button>
        <button className={filterBy["Pets allowed"] ? "filter-btn-active" : "filter-btn"} onClick={() => { setFilter({ ...filterBy, "Pets allowed": !filterBy["Pets allowed"] }) }}>Pets Allowed</button>
    </div >
    )

}

function mapStateToProps({ stayModule }) {
    return {
        filterBy: stayModule.filterBy,
        stayType: stayModule.stayType,
        stays: stayModule.stays,
    };
}
const mapDispatchToProps = {
    setFilterBy
};

export const SortStay = connect(mapStateToProps, mapDispatchToProps)(_SortStay);
