import React, { Component } from "react";
import http from "../../utils/http";
import { Container, Grid, Loader, Dimmer } from "semantic-ui-react";

import AddCategory from "../../components/AddCategory";
import AddTask from "../../components/AddTask";
import DisplayTask from "../../components/DisplayTask";
import DisplayChart from "../../components/DisplayChart";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      categories: [],
      loading: true
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchTasks();
  }

  fetchCategories() {
    // Create object {name,color} from category
    http.get(process.env.REACT_APP_GET_CATEGORIES_URL).then(c => {
      this.setState({ categories: c.reverse() });
    });
  }

  fetchTasks() {
    //   Get all tasks
    http.get(process.env.REACT_APP_GET_TASKS_URL).then(t => {
      this.setState({ tasks: t.reverse() });
      this.setState({ loading: false });
    });
  }

  render() {
    const { tasks, categories, loading } = this.state;
    return (
      <div className="homepage">
        <div className="main-content">
          {loading === true ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Container className="animated fadeIn">
              <Grid>
                <Grid.Column mobile={16} computer={11}>
                  {categories.length > 0 ? (
                    <AddTask
                      categories={categories}
                      fetchTasks={this.fetchTasks}
                    />
                  ) : (
                    <h3>Add a category to get started!</h3>
                  )}
                  <DisplayTask tasks={tasks} />
                </Grid.Column>
                <Grid.Column mobile={16} computer={5}>
                  <DisplayChart tasks={tasks} />
                  <AddCategory fetchCategories={this.fetchCategories} />
                </Grid.Column>
              </Grid>
            </Container>
          )}
        </div>
      </div>
    );
  }
}

export default Homepage;
