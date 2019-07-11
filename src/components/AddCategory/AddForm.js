import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";

class AddForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Group>
          <Input
            placeholder="New Category"
            value={this.props.category}
            onChange={this.props.setCategory}
            required
          />
          <Button
            type="submit"
            disabled={this.props.disabled}
            style={{ backgroundColor: this.props.color }}
          >
            Add
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default AddForm;
