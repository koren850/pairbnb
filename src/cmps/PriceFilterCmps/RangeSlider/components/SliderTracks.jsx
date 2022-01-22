import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const trackHeight = 3;
const thumbHeight = 25;

const StyledTrack = styled.div`
  background-color: #f86b23;
  height: ${`${trackHeight}px`};
  position: absolute;
  z-index: 1;
  pointer-events: none;
  left: ${props => props.left};
  width: ${props => props.width};
`;
const StyledTrackHotSpot = styled.div`
  height: ${thumbHeight}px;
  top: ${`${thumbHeight * -0.5}px`};
  position: absolute;
  cursor: pointer;
  left: ${props => props.left};
  width: ${props => props.width};
`;

const SliderRail = ({ source, target, getTrackProps }) => {
  const left = `${source.percent}%`;
  const width = `${target.percent - source.percent}%`;

  return (
    <>
      <StyledTrack left={left} width={width} />
      <StyledTrackHotSpot left={left} width={width} {...getTrackProps()} />
    </>
  );
};

SliderRail.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired
};

export default SliderRail;
