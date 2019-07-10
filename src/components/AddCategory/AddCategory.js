import React, { Component } from "react";
import postToServer from "../../utils/postToServer";

import { Card, Form, Input, Button } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import "./style.scss";

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      color: "",
      displayPicker: false
    };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setColor = this.setColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleColorPicker() {
    this.setState(prev => ({
      displayPicker: !prev.displayPicker
    }));
  }

  setCategory(e) {
    let empty = false;
    let category = e.target.value;

    if (category !== "") {
      empty = true;
    }

    this.setState({
      category,
      displayPicker: empty
    });
  }

  setColor(color) {
    this.setState({
      color: color.hex
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: this.state.category,
      color: this.state.color
    };

    const response = postToServer(
      process.env.REACT_APP_POST_CATEGORY_URL,
      data
    );

    response.then(r => {
      console.log(r);
      this.setState({
        color: "",
        category: "",
        displayPicker: false
      });
    });
  }

  render() {
    const { color, category } = this.state;
    return (
      <Card className="add-category-card">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Input
              placeholder="New Category"
              value={category}
              onChange={this.setCategory}
              required
            />
            <Button
              type="submit"
              disabled={category && color ? false : true}
              style={{ backgroundColor: color }}
            >
              Add
            </Button>
          </Form.Group>
        </Form>

        {/* Color Picker */}
        {this.state.displayPicker && (
          <SketchPicker onChange={this.setColor} color={color} />
        )}
      </Card>
    );
  }
}
export default AddCategory;
