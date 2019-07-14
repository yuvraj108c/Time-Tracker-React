import React, { Component } from "react";
import getFromServer from "../../utils/getFromServer";
import { Container, Grid, Loader, Dimmer } from "semantic-ui-react";

import AddCategory from "../../components/AddCategory";
import AddTask from "../../components/AddTask";
import DisplayTask from "../../components/DisplayTask";

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
    getFromServer(process.env.REACT_APP_GET_CATEGORIES_URL).then(categories => {
      this.setState({ categories });
    });
  }

  fetchTasks() {
    //   Get all tasks
    getFromServer(process.env.REACT_APP_GET_TASKS_URL).then(t => {
      this.setState({ tasks: t });
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
            <Container>
              <Grid>
                <Grid.Column mobile={16} computer={10}>
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
                <Grid.Column mobile={16} computer={6}>
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
