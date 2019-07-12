import React from "react";

import Navbar from "../Navbar";
import { Container, Grid } from "semantic-ui-react";
import AddCategory from "../AddCategory";
import AddTask from "../AddTask";
import DisplayTask from "../DisplayTask";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <div className="main-content">
        <Container>
          <Grid>
            <Grid.Column mobile={16} computer={10}>
              <AddTask />
              <DisplayTask />
            </Grid.Column>
            <Grid.Column mobile={16} computer={6}>
              <AddCategory />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default App;
