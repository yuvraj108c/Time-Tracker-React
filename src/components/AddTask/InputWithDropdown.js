import React, { Component } from "react";
import { Dropdown, Input } from "semantic-ui-react";

class InputWithDropdown extends Component {
  render() {
    return (
      <Input
        action={
          <Dropdown
            button
            basic
            floating
            options={this.props.options}
            defaultValue={this.props.defaultCategory}
          />
        }
        placeholder="Enter task"
      />
    );
  }
}

export default InputWithDropdown;
