import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = props => {
  return (
    <Doughnut data={props.data} width={1} height={1} options={props.options} />
  );
};

export default DoughnutChart;
