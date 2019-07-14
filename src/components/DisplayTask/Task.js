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
          <Grid.Column mobile={6}>{name}</Grid.Column>
          <Grid.Column mobile={3} style={{ color: categoryColor }}>
            <Label circular empty style={{ backgroundColor: categoryColor }} />
            {categoryName}
          </Grid.Column>
          <Grid.Column mobile={2}>{startTime}</Grid.Column>
          <Grid.Column mobile={2}>{endTime}</Grid.Column>
          <Grid.Column className="text-center" mobile={3}>
            {duration}
          </Grid.Column>
        </Grid>
      </Item.Content>
    </Item>
  );
};
export default Task;
