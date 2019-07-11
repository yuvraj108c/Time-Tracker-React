import React, { Component } from "react";
import { Select, Input } from "semantic-ui-react";

class InputWithDropdown extends Component {
  render() {
    return (
      <Input
        name="taskName"
        value={this.props.taskName}
        onChange={this.props.handleInputChange}
        action={
          <Select
            compact
            options={this.props.options}
            name="taskCategory"
            value={this.props.taskCategory}
            onChange={this.props.handleDropdownChange}
          />
        }
        placeholder="Enter task"
      />
    );
  }
}

export default InputWithDropdown;
