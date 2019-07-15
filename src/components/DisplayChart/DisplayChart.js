import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { getDurationInHours } from "../../utils/calculateDuration";
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
    this.computeDataAndDrawChart = this.computeDataAndDrawChart.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.computeDataAndDrawChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tasks.length < this.props.tasks.length) {
      this.computeDataAndDrawChart();
    }
  }

  computeDataAndDrawChart() {
    let timePerCategory = {};
    let labels = [];
    let data = [];
    let backgroundColor = [];
    let totalTime = 0;

    this.props.tasks.forEach(task => {
      const taskCategory = task.category[0];
      const taskDuration = getDurationInHours(task.startTime, task.endTime);

      totalTime += taskDuration;

      timePerCategory[taskCategory.name] = {
        sum:
          timePerCategory[taskCategory.name] === undefined
            ? taskDuration
            : timePerCategory[taskCategory.name].sum + taskDuration,
        color: taskCategory.color
      };
    });

    Object.keys(timePerCategory).forEach(c => {
      labels.push(c);
      data.push(timePerCategory[c].sum.toFixed(2));
      backgroundColor.push(timePerCategory[c].color);
    });

    this.setState({ labels, data, backgroundColor, totalTime });

    this.drawChart("doughnut", labels, data, backgroundColor);
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
