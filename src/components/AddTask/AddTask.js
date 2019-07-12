import React, { Component } from "react";
import moment from "moment";
import getFromServer from "../../utils/getFromServer";
import postToServer from "../../utils/postToServer";
import InputWithDropdown from "./InputWithDropdown";
import { Grid, Card } from "semantic-ui-react";
import Btn from "./Btn";

import "./style.scss";

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      categoriesOptions: [],
      taskName: "",
      taskCategory: "",
      startTime: "",
      duration: "00:00:00",
      btnText: "Start",
      btnColor: "blue",
      btnDisabled: false,
      timer: null
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }
  componentDidMount() {
    //   Fetch categories from server
    getFromServer(process.env.REACT_APP_GET_CATEGORIES_URL).then(categories => {
      const modifiedCategories = [];
      categories.forEach(c => {
        modifiedCategories.push({
          key: c._id,
          text: c.name,
          value: c.name
        });
      });
      this.setState({
        categoriesOptions: modifiedCategories,
        taskCategory: modifiedCategories[0].value
      });
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleDropdownChange(e, { name, value }) {
    this.setState({
      [name]: value
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
      startTime: moment().format("hh:mm:ss")
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
      }, 1000)
    });
  }
  stopTimer() {
    // TODO: Send to server
    const data = {
      name: this.state.taskName,
      category: this.state.taskCategory,
      startTime: this.state.startTime,
      endTime: moment().format("hh:mm:ss")
    };
    console.log(data);
    postToServer(process.env.REACT_APP_POST_TASK_URL, data).then(res =>
      console.log(res)
    );
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      taskName: "",
      starTime: "",
      duration: "00:00:00",
      taskCategory: this.state.categoriesOptions[0].value
    });
    localStorage.removeItem("Task");
  }
  render() {
    return (
      <Card className="add-task-card">
        {this.state.categoriesOptions.length > 0 && (
          <>
            <Grid>
              <Grid.Column mobile={10}>
                <InputWithDropdown
                  options={this.state.categoriesOptions}
                  defaultCategory={this.state.categoriesOptions[0].key}
                  handleInputChange={this.handleInputChange}
                  handleDropdownChange={this.handleDropdownChange}
                  taskName={this.state.taskName}
                  taskCategory={this.state.taskCategory}
                />
              </Grid.Column>
              <Grid.Column mobile={3}>
                <h3 className="duration-display">{this.state.duration}</h3>
              </Grid.Column>
              <Grid.Column mobile={3}>
                <Btn
                  text={this.state.btnText}
                  color={this.state.btnColor}
                  handleClick={this.handleButtonClick}
                  disabled={this.state.btnDisabled}
                />
              </Grid.Column>
            </Grid>
          </>
        )}
      </Card>
    );
  }
}

export default AddTask;
