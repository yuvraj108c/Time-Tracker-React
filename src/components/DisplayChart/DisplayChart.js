import React, { Component } from "react";
import Chart from "chart.js";
// import { Card } from "semantic-ui-react";
import { getDurationInHours } from "../../utils/calculateDuration";

class DisplayChart extends Component {
  constructor() {
    super();
    this.state = {
      labels: [],
      data: [],
      backgroundColors: []
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
    let backgroundColors = [];

    this.props.tasks.forEach(task => {
      const taskCategory = task.category[0];
      const taskDuration = getDurationInHours(task.startTime, task.endTime);

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
      data.push(timePerCategory[c].sum);
      backgroundColors.push(timePerCategory[c].color);
    });

    this.setState({ labels, data, backgroundColors });

    this.drawChart("doughnut", labels, data, backgroundColors);
  }

  drawChart(type, labels, data, backgroundColors) {
    let ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  render() {
    return (
      <canvas id="myChart" width="1" height="1" />
      //   <Card>
      /* </Card> */
    );
  }
}

export default DisplayChart;
