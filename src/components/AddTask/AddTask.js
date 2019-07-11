import React, { Component } from "react";
import getFromServer from "../../utils/getFromServer";
import InputWithDropdown from "./InputWithDropdown";
import { Card } from "semantic-ui-react";

import "./style.scss";

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      categoriesOptions: []
    };
  }
  componentDidMount() {
    getFromServer(process.env.REACT_APP_GET_CATEGORIES_URL).then(categories => {
      const modifiedCategories = [];
      categories.forEach(c => {
        modifiedCategories.push({
          key: c._id,
          text: c.name,
          value: c._id
        });
      });
      this.setState({ categoriesOptions: modifiedCategories });
    });
  }
  render() {
    return (
      <Card className="add-task-card">
        {this.state.categoriesOptions.length > 0 && (
          <InputWithDropdown
            options={this.state.categoriesOptions}
            defaultCategory={this.state.categoriesOptions[0].key}
          />
        )}
      </Card>
    );
  }
}

export default AddTask;
