import React, { Component } from "react";
import getFromServer from "../../utils/getFromServer";
import InputWithDropdown from "./InputWithDropdown";
import { Grid, Form, Card, Button } from "semantic-ui-react";
import Btn from "./Btn";

import "./style.scss";

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      categoriesOptions: [],
      taskName: "",
      taskCategory: "",
      duration: "00:00:00",
      btnText: "Start",
      btnColor: "blue",
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
          value: c._id
        });
      });
      this.setState({
        categoriesOptions: modifiedCategories,
        taskCategory: modifiedCategories[0].key
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
      timer: setInterval(() => {
        elapsedTime++;
        this.setState({
          duration: new Date(elapsedTime * 1000).toISOString().substr(11, 8)
        });
      }, 1000)
    });
  }
  stopTimer() {
    //   TODO: Validate Form
    // TODO: Send to server
    // TODO: Show tracked task
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      duration: "00:00:00"
    });
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
