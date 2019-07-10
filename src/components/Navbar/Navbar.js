import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

class Navbar extends Component {
  render() {
    return (
      <Menu size="massive" inverted>
        <Container>
          <Menu.Item as={Link} to="/" header>
            Time Tracker
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/">
              Track
            </Menu.Item>
            <Menu.Item as={Link} to="/analyze">
              Analyze
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
