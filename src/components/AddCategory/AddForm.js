import React, { Component } from "react";
import { Grid, Form, Input, Button } from "semantic-ui-react";

class AddForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Grid>
          <Grid.Column mobile={12}>
            <Input
              placeholder="New Category"
              value={this.props.category}
              onChange={this.props.setCategory}
              required
            />
          </Grid.Column>
          <Grid.Column mobile={4}>
            <Button
              type="submit"
              disabled={this.props.disabled}
              style={{ backgroundColor: this.props.color }}
            >
              Add
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default AddForm;
