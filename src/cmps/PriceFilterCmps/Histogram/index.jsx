import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

const StyledHistogram = styled.div`
  position: relative;
  width: 100%;
`;
console.log('in index')
const Histogram = ({ data, highlight }) => {
  const trimData = data;
  trimData.pop();

  const handleClick = (c, i) => {
    console.log(i[0]._index);
  };
  const barData = {
    labels: trimData.map((val, i) => i),
    datasets: [
      {
        categoryPercentage: 1,
        barPercentage: 1,
        backgroundColor: trimData.map((val, i) =>
          i >= highlight[0] && i < highlight[1] ? "#FCE1D3" : "#C8CED5"
        ),
        hoverBackgroundColor: "#FCE1D3",
        data: trimData
      }
    ]
  };

  const options = {

    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: { enabled: false },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [{ display: false }]
    },
    onClick: handleClick
  };
  console.log(options)
console.log(barData)
  return (
    <StyledHistogram>
      <Bar data={barData} options={options} />
    </StyledHistogram>
  );
};

Histogram.propTypes = {
  data: PropTypes.object,
  highlight: PropTypes.array
};

Histogram.defaultProps = {
  data: {},
  highlight: []
};

export default Histogram;
