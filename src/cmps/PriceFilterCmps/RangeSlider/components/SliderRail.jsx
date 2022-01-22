import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const trackHeight = 3;
const thumbHeight = 25;

const StyledSliderRail = styled.div`
  background-color: #c8ced5;
  width: 100%;
  height: ${`${trackHeight}px`};
  position: absolute;
  pointer-events: none;
`;
const StyledRailHotSpot = styled.div`
  width: 100%;
  height: ${`${thumbHeight * 2}px`};
  top: ${`${thumbHeight * -1}px`};
  position: absolute;
  cursor: pointer;
`;

const SliderRail = ({ getRailProps }) => {
  return (
    <>
      <StyledRailHotSpot {...getRailProps()} />
      <StyledSliderRail />
    </>
  );
};

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired
};

export default SliderRail;
