import React, { useState } from "react";

export function SearchBarFilterInput({ placeholder, data,onChooseLocation }) {

      console.log(data);
  return (<article className="search-filter-container">
    <div className="search-filter-inputs">
      <input placeholder={placeholder} type="text"/>
      <div className="search-icon"></div>
     {data && <div className="data-result">
      {data.map((value,idx)=>{
        return <div onClick={onChooseLocation} key={value.loc.country,idx}>{value.loc.country}</div>
      })}
      </div>}

    </div>
  </article>)
}

