import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const thumbHeight = 25;

const StyledSliderHandle = styled.div`
  background-color: #ffffff;
  margin-left: ${`${thumbHeight * -0.5}px`};
  margin-top: ${`${thumbHeight * -0.5}px`};
  width: ${`${thumbHeight}px`};
  height: ${`${thumbHeight}px`};
  border: 1px solid #f86b23;
  border-radius: 50%;
  white-space: nowrap;
  position: absolute;
  z-index: 2;
  cursor: pointer;
`;
const SliderHandle = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps
}) => (
  <StyledSliderHandle
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{ left: `${percent}%` }}
    {...getHandleProps(id)}
  />
);

SliderHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired
};

export default SliderHandle;
