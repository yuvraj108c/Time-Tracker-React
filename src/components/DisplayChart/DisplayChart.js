import React, { Component } from "react";
import Chart from "chart.js";
import { Card } from "semantic-ui-react";
import { getDurationInHours } from "../../utils/calculateDuration";
import "./style.scss";

class DisplayChart extends Component {
  constructor() {
    super();
    this.state = {
      labels: [],
      data: [],
      backgroundColors: [],
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
    let backgroundColors = [];
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
      backgroundColors.push(timePerCategory[c].color);
    });

    this.setState({ labels, data, backgroundColors, totalTime });

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
      <Card className="chart-card">
        <Card.Header className="text-center">
          <h3>Total Time : {this.state.totalTime.toFixed(2)} Hours</h3>
        </Card.Header>
        <Card.Content>
          <canvas id="myChart" width="1" height="1" />
        </Card.Content>
      </Card>
    );
  }
}

export default DisplayChart;
