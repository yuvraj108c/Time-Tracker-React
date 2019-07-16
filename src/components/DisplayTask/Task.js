import React from "react";
import { Item, Grid, Label } from "semantic-ui-react";

import "./style.scss";

const Task = props => {
  const {
    name,
    categoryName,
    categoryColor,
    startTime,
    endTime,
    duration
  } = props;
  return (
    <Item className="task-item">
      <Item.Content>
        <Grid>
          <Grid.Column computer={5}>{name}</Grid.Column>
          <Grid.Column computer={3} style={{ color: categoryColor }}>
            <Label circular empty style={{ backgroundColor: categoryColor }} />
            {categoryName}
          </Grid.Column>
          <Grid.Column computer={3}>{startTime}</Grid.Column>
          <Grid.Column computer={3}>{endTime}</Grid.Column>
          <Grid.Column computer={2}>{duration}</Grid.Column>
        </Grid>
      </Item.Content>
    </Item>
  );
};
export default Task;
