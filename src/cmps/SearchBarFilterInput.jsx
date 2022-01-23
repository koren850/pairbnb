import React, { useState } from "react";
import locationSvg from "../styles/svg/location.svg";

export function SearchBarFilterInput({ placeholder, data, ChooseLocation, elLocationInput }) {
  const [filteredData, setFilteredData] = useState([]);
  const [userCurrSearch, setUserCurrSearch] = useState('');
  const [visible, setVisible] = useState(true);

  function handleChange({ target }) {
    if (!visible) setVisible(true);
    const { value } = target;
    let newFilter = data.filter(item => (item.loc.country.toLowerCase().includes(value.toLowerCase()) || item.loc.address.toLowerCase().includes(value.toLowerCase())));
    if (!value) newFilter = [];
    setFilteredData(newFilter);
    setUserCurrSearch(value)
  }

  function onPlaceClick(ev, location) {
    ev.stopPropagation();
    if (visible) setVisible(false);
    setUserCurrSearch(location);
    ChooseLocation(location);
  }

  // console.log(data);
  return (<article className="search-filter-container">
    <div className="search-filter-inputs">
      <input ref={elLocationInput} id="location" className="search-input" value={userCurrSearch} placeholder={placeholder} onChange={handleChange} type="text" />
      <div className="search-icon"></div>
      {(filteredData.length !== 0) && <ul className={`data-result ${(visible) ? '' : 'not-visible'}`}>
        {filteredData.map((value, idx) => {
          return <li onClick={(ev) => onPlaceClick(ev, value.loc.address)} key={value.loc.country + idx} className="data-item"><p>{value.loc.address} , <small>{value.loc.country}</small></p><img src={locationSvg}/></li>
        })}
      </ul>}

    </div>
  </article>)
}

