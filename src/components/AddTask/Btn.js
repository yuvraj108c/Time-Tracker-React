import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class Btn extends Component {
  render() {
    const { text, color, handleClick } = this.props;
    return (
      <Button color={color} onClick={handleClick}>
        {text}
      </Button>
    );
  }
}

export default Btn;
