import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class Btn extends Component {
  render() {
    const { text, color, handleClick, disabled, animated } = this.props;
    return (
      <Button
        className={animated ? "pulsing" : ""}
        disabled={disabled}
        color={color}
        onClick={handleClick}
      >
        {text}
      </Button>
    );
  }
}

export default Btn;
