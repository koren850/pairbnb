import React from "react";
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import PropTypes from "prop-types";
import SliderRail from "./components/SliderRail";
import SliderHandle from "./components/SliderHandle";
import SliderTracks from "./components/SliderTracks";

const StyledRangeSlider = styled.div`
  position: relative;
  width: 100%;
`;

const RangeSlider = ({ domain, values, step, mode, onUpdate, onChange }) => {
  const handleUpdate = data => {
    onUpdate(data);
  };
  const handleChange = data => {
    onChange(data);
  };
console.log('rangeslider')
  return (
    <StyledRangeSlider>
      <Slider
        mode={mode}
        step={step}
        domain={domain}
        onUpdate={handleUpdate}
        onChange={handleChange}
        values={values}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <>
              {handles.map(handle => (
                <SliderHandle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <>
              {tracks.map(({ id, source, target }) => (
                <SliderTracks
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </>
          )}
        </Tracks>
      </Slider>
    </StyledRangeSlider>
  );
};

RangeSlider.propTypes = {
  domain: PropTypes.array,
  values: PropTypes.array,
  step: PropTypes.number,
  mode: PropTypes.number,
  onUpdate: PropTypes.func,
  onChange: PropTypes.func
};

RangeSlider.defaultProps = {
  domain: [],
  values: [],
  step: 1,
  mode: 2,
  onUpdate: () => {},
  onChange: () => {}
};

export default RangeSlider;
