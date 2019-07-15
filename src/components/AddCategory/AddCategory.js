import React, { Component } from "react";
import http from "../../utils/http";

import { Card } from "semantic-ui-react";
import { SketchPicker } from "react-color";
import AddForm from "./AddForm";
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

    const response = http.post(process.env.REACT_APP_POST_CATEGORY_URL, data);

    response.then(r => {
      console.log(r);
      this.setState({
        color: "",
        category: "",
        displayPicker: false
      });

      this.props.fetchCategories();
    });
  }

  render() {
    const { color, category } = this.state;
    const disableSubmitBtn = category && color ? false : true;
    return (
      <Card className="add-category-card">
        <AddForm
          handleSubmit={this.handleSubmit}
          category={category}
          color={color}
          setCategory={this.setCategory}
          disabled={disableSubmitBtn}
        />
        {/* Color Picker */}
        {this.state.displayPicker && (
          <SketchPicker onChange={this.setColor} color={color} />
        )}
      </Card>
    );
  }
}
export default AddCategory;
