import React, { Component } from "react";
import moment from "moment";
import Task from "./Task";
import { Card, Item } from "semantic-ui-react";
import getFromServer from "../../utils/getFromServer";

import "./style.scss";

class DisplayTask extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      categories: null
    };
  }
  componentDidMount() {
    //   Get tasks
    getFromServer(process.env.REACT_APP_GET_TASKS_URL).then(tasks => {
      this.setState({
        tasks: tasks
      });
    });

    // Get categories
    getFromServer(process.env.REACT_APP_GET_CATEGORIES_URL).then(categories => {
      let categoriesObj = {};
      categories.forEach(c => {
        categoriesObj[c._id] = { cName: c.name, cColor: c.color };
      });
      this.setState({ categories: { ...categoriesObj } });
    });
  }
  render() {
    return (
      <Card className="tasks-card">
        <Item.Group divided>
          {this.state.categories &&
            this.state.tasks.map(task => {
              const { _id, name, category, startTime, endTime } = task;
              const { cName, cColor } = this.state.categories[category];

              //   Calculate duration
              const start = moment(startTime, "HH mm");
              const end = moment(endTime, "HH mm");
              const durationInMillis = moment
                .duration(end.diff(start))
                .as("milliseconds");

              return (
                <Task
                  key={_id}
                  name={name}
                  categoryName={cName}
                  categoryColor={cColor}
                  startTime={startTime}
                  endTime={endTime}
                  duration={moment.utc(durationInMillis).format("HH:mm")}
                />
              );
            })}
        </Item.Group>
      </Card>
    );
  }
}

export default DisplayTask;
