import React from "react";

import Navbar from "../Navbar";
import { Container, Grid } from "semantic-ui-react";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <div className="main-content">
        <Container>
          <Grid>
            <Grid.Column mobile={16} computer={10}>
              Grid 1
            </Grid.Column>
            <Grid.Column mobile={16} computer={6}>
              Grid 2
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default App;
