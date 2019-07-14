import React, { Component } from "react";
import getFromServer from "../../utils/getFromServer";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      categories: []
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
  }
  componentDidMount() {
    this.fetchCategories();
    this.fetchTasks();
  }

  fetchCategories() {
    //   Get all categories
    getFromServer(process.env.REACT_APP_GET_CATEGORIES_URL).then(c => {
      this.setState({ categories: c });
    });
  }

  fetchTasks() {
    //   Get all tasks
    getFromServer(process.env.REACT_APP_GET_TASKS_URL).then(t => {
      this.setState({ tasks: t });
    });
  }

  render() {
    return <div />;
  }
}

export default Homepage;
