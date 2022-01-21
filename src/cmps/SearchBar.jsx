import { useEffect, useState } from "react";
import searchSvg from "../styles/svg/search.svg";
import { SpecialButton } from "./SpacialButton";
import { connect } from "react-redux";
import { toggleDetailsLayout, toggleHeaderIsDark, toggleHeaderIsActive } from "../store/header.action";

 function _SearchBar({ onToggleIsActive,headerMode }) {
  const [someActive, setSomeActive] = useState(null);

  function updateSomeActive(elName,ev) {
    ev.stopPropagation();
        ev.preventDefault();
    (someActive === elName) ? setSomeActive(null) : setSomeActive(elName);
  }

  function turnOffActive(ev) {
    if (!headerMode.isActive) return
    if (window.scrollY < 1) return setSomeActive(null);
    (someActive) ? setSomeActive(null) : onToggleIsActive();
  }
  useEffect(() => {
    window.addEventListener('scroll', turnOffActive);
   window.addEventListener('click', turnOffActive);
    return () => {
      window.removeEventListener('click', turnOffActive);
      window.removeEventListener('scroll', turnOffActive);
    }
   } , [someActive])

  return (
    <div className={"bar origi " + (someActive && "active-search-bar")}>
      <div onClick={(ev) => updateSomeActive('location',ev)} className={"location origi " + (someActive === 'location' ? 'active' : '')}>
        <p>Location</p>
        <input type="text" placeholder="Where are you going?" />
      </div>
      <hr />
      <div onClick={(ev) => updateSomeActive('check-in',ev)} className={"check-in origi " + (someActive === 'check-in' ? 'active' : '')}>
        <p>Check in</p>
        <input className="bar-input" type="text" placeholder="Add dates" />
      </div>
      <hr />
      <div onClick={(ev) => updateSomeActive('check-out',ev)} className={"check-out origi " + (someActive === 'check-out' ? 'active' : '')}>
        <p>Check out</p>
        <input className="bar-input" type="text" placeholder="Add dates" />
      </div>
      <hr />
      <div onClick={(ev) => updateSomeActive('guests',ev)} className={"guests origi " + (someActive === 'guests' ? 'active' : '')}>
        <p>Guests</p>
        <input className="bar-input" type="text" placeholder="Add guests" />
        <div className='spacial-btn search-spacial-btn'>
          <SpecialButton isActive={someActive} size={{ width: '50px', height: '50px', }} text={<img src={searchSvg} className='search-svg' alt='' />} />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ headerModule }) {
	return {
		headerMode: headerModule.headerMode,
	};
}
const mapDispatchToProps = {
	toggleDetailsLayout,
	toggleHeaderIsDark,
	toggleHeaderIsActive
};

export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBar);
