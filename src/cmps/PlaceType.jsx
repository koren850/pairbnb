import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { setFilterBy } from "../store/stay.action.js";

// import React from 'react';

export function _PlaceType({ setFilterBy }) {

    const [filterBy, setFilter] = useState({
        // "Wifi": false,
    })

    
    function tester(ev) {
        console.log('hi')
    };


    return (<div className="place-type">
        <button onClick={tester}>Type of place</button>
    </div>
    )

}

function mapStateToProps({ stayModule }) {
    return {
        filterBy: stayModule.filterBy,
        stays: stayModule.stays,
    };
}
const mapDispatchToProps = {
    setFilterBy
};

export const PlaceType = connect(mapStateToProps, mapDispatchToProps)(_PlaceType);
