import { useEffect, useState } from "react";
import searchSvg from "../styles/svg/search.svg";
import { SpecialButton } from "./SpacialButton";

export function SearchBar({ isActive, onToggleIsActive }) {
  const [someActive, setSomeActive] = useState(true);
  function updateSomeActive(elName) {
    (someActive === elName) ? setSomeActive(null) : setSomeActive(elName);
  }

  function turnOffActive() {
    (someActive) ? setSomeActive(null) : onToggleIsActive();
  }
  useEffect(() => {
  //  window.addEventListener('click', turnOffActive());
   window.removeEventListener('click', turnOffActive);
    return () => {
      window.removeEventListener('click', turnOffActive);
    }
   } , [someActive])

  return (
    <div className={"bar origi " + (isActive && "active-search-bar")}>
      <div onClick={() => updateSomeActive('location')} className={"location origi " + (someActive === 'location' ? 'active' : '')}>
        <p>Location</p>
        <input type="text" placeholder="Where are you going?" />
      </div>
      <hr />
      <div onClick={() => updateSomeActive('check-in')} className={"check-in origi " + (someActive === 'check-in' ? 'active' : '')}>
        <p>Check in</p>
        <input className="bar-input" type="text" placeholder="Add dates" />
      </div>
      <hr />
      <div onClick={() => updateSomeActive('check-out')} className={"check-out origi " + (someActive === 'check-out' ? 'active' : '')}>
        <p>Check out</p>
        <input className="bar-input" type="text" placeholder="Add dates" />
      </div>
      <hr />
      <div onClick={() => updateSomeActive('guests')} className={"guests origi " + (someActive === 'guests' ? 'active' : '')}>
        <p>Guests</p>
        <input className="bar-input" type="text" placeholder="Add guests" />
        <div className='spacial-btn search-spacial-btn'>
          <SpecialButton isActive={isActive} size={{ width: '50px', height: '50px', }} text={<img src={searchSvg} className='search-svg' alt='' />} />
        </div>
      </div>
    </div>
  )
}