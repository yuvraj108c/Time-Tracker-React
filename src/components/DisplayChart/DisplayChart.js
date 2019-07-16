import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import { computeChartData } from "./helper";
import DoughnutChart from "./DoughnutChart";

import "./style.scss";
class DisplayChart extends Component {
  constructor() {
    super();
    this.state = {
      labels: [],
      data: [],
      backgroundColor: [],
      totalTime: 0
    };
    this.computeData = this.computeData.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.computeData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tasks.length < this.props.tasks.length) {
      this.computeData();
    }
  }

  computeData() {
    const { labels, data, backgroundColor, totalTime } = computeChartData(
      this.props.tasks
    );
    this.setState({
      labels,
      data,
      backgroundColor,
      totalTime
    });
  }

  drawChart(labels, data, backgroundColor) {
    const data2 = {
      labels: labels,
      datasets: [
        {
          data,
          backgroundColor
        }
      ]
    };
    const options = {
      legend: {
        display: false
      }
    };

    return <DoughnutChart data={data2} options={options} />;
  }

  render() {
    const { data, labels, backgroundColor, totalTime } = this.state;

    return (
      <Card className="chart-card">
        <Card.Header className="text-center">
          <h3>Total Time : {totalTime.toFixed(2)} Hours</h3>
        </Card.Header>
        <Card.Content>
          {this.drawChart(labels, data, backgroundColor)}
        </Card.Content>
      </Card>
    );
  }
}

export default DisplayChart;
