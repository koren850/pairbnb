import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledRangeInput = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input``;

const RangeInput = ({ inputRange, onChange }) => {
  const [defaultMin, defaultMax] = inputRange;
  const [rangeValue, setRangeValue] = useState(inputRange);

  const handleChange = e => {
    const thisValue = Number(e.target.value);
    const thisType = e.target.dataset && e.target.dataset.type;

    if (isNaN(thisValue)) return;

    if (thisType === "min") setRangeValue([thisValue, rangeValue[1]]);
    if (thisType === "max") setRangeValue([rangeValue[0], thisValue]);
  };

  const handleBlur = e => {
    const thisValue = Number(e.target.value);
    const thisType = e.target.dataset && e.target.dataset.type;
    let returnValue = rangeValue;

    if (isNaN(thisValue)) return;

    if (thisType === "min" && thisValue >= rangeValue[1])
      returnValue = [defaultMin, rangeValue[1]];

    if (thisType === "max" && thisValue <= rangeValue[0])
      returnValue = [rangeValue[0], defaultMax];

    onChange(returnValue); // callback data
    setRangeValue(returnValue); // set range value
  };

  useEffect(() => {
    setRangeValue(inputRange);
  }, [inputRange]);

  return (
    <StyledRangeInput>
      <InputField
        type="tel"
        data-type="min"
        value={rangeValue[0]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <InputField
        type="tel"
        data-type="max"
        value={rangeValue[1]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </StyledRangeInput>
  );
};

RangeInput.propTypes = {
  inputRange: PropTypes.array,
  onChange: PropTypes.func
};

RangeInput.defaultProps = {
  inputRange: [],
  onChange: () => {}
};

export default RangeInput;
