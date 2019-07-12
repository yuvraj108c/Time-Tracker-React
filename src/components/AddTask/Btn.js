import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class Btn extends Component {
  render() {
    const { text, color, handleClick, disabled } = this.props;
    return (
      <Button disabled={disabled} color={color} onClick={handleClick}>
        {text}
      </Button>
    );
  }
}

export default Btn;
