import React, { Component } from "react";
import moment from "moment";

import http from "../../utils/http";
import InputWithDropdown from "./InputWithDropdown";
import Btn from "./Btn";

import { Grid, Card } from "semantic-ui-react";

import "./style.scss";

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOptions: [],
      taskName: "",
      taskCategory: "",
      startTime: "",
      duration: "00:00:00",
      durationColor: props.categories[0].color,
      btnText: "Start",
      btnColor: "blue",
      btnDisabled: false,
      timer: null
    };
    this.createDropdownOptions = this.createDropdownOptions.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.createDropdownOptions();
  }
  componentDidUpdate(prevProps) {
    // Update if new categories added
    if (prevProps.categories.length < this.props.categories.length) {
      this.createDropdownOptions();
    }
  }
  createDropdownOptions() {
    const dropdownOptions = [];

    this.props.categories.forEach(c => {
      dropdownOptions.push({
        key: c._id,
        text: c.name,
        value: c.name
      });

      this.setState({
        dropdownOptions,
        taskCategory: dropdownOptions[0].value
      });
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleDropdownChange(e, { name, value }) {
    let category = this.props.categories.filter(c => c.name === value);
    this.setState({
      [name]: value,
      durationColor: category[0].color
    });
  }
  handleButtonClick() {
    const btnType = this.state.btnText;
    if (btnType === "Start") {
      this.startTimer();
      this.setState({
        btnColor: "red",
        btnText: "Stop"
      });
    } else if (btnType === "Stop") {
      this.stopTimer();
      this.setState({
        btnColor: "blue",
        btnText: "Start"
      });
    }
  }
  startTimer() {
    let elapsedTime = 0;

    this.setState({
      btnDisabled: true,
      startTime: moment().format("HH:mm")
    });

    this.setState({
      timer: setInterval(() => {
        elapsedTime++;
        this.setState({
          btnDisabled:
            this.state.taskName && this.state.taskCategory ? false : true,
          duration: new Date(elapsedTime * 1000).toISOString().substr(11, 8)
        });

        localStorage.setItem(
          "Task",
          JSON.stringify({
            name: this.state.taskName,
            duration: this.state.duration
          })
        );

        document.title = this.state.duration;
      }, 1000)
    });
  }
  stopTimer() {
    const data = {
      name: this.state.taskName,
      category: this.state.taskCategory,
      startTime: this.state.startTime,
      endTime: moment().format("HH:mm")
    };
    console.log(data);
    http.post(process.env.REACT_APP_POST_TASK_URL, data).then(res => {
      console.log(res);
      this.props.fetchTasks();
    });
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      taskName: "",
      startTime: "",
      duration: "00:00:00",
      taskCategory: this.state.dropdownOptions[0].value,
      durationColor: this.props.categories[0].color
    });
    localStorage.removeItem("Task");
    document.title = "Time Tracker";
  }
  render() {
    return (
      <Card className="add-task-card">
        <>
          <Grid>
            <Grid.Column mobile={10}>
              <InputWithDropdown
                options={this.state.dropdownOptions}
                handleInputChange={this.handleInputChange}
                handleDropdownChange={this.handleDropdownChange}
                taskName={this.state.taskName}
                taskCategory={this.state.taskCategory}
              />
            </Grid.Column>
            <Grid.Column mobile={3}>
              <h3
                className={
                  this.state.timer === null
                    ? "duration-display"
                    : "duration-display animated infinite flash"
                }
                style={{ color: this.state.durationColor }}
              >
                {this.state.duration}
              </h3>
            </Grid.Column>
            <Grid.Column mobile={3}>
              <Btn
                text={this.state.btnText}
                color={this.state.btnColor}
                handleClick={this.handleButtonClick}
                disabled={this.state.btnDisabled}
                animated={this.state.timer === null}
              />
            </Grid.Column>
          </Grid>
        </>
      </Card>
    );
  }
}

export default AddTask;
