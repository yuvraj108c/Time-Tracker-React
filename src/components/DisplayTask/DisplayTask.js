import React from "react";
import calculateDuration from "../../utils/calculateDuration";

import Task from "./Task";
import { Card, Item, Grid } from "semantic-ui-react";

import "./style.scss";

const DisplayTask = props => {
  return (
    <Card className="tasks-card">
      <Item.Group divided>
        <Item className="task-item-header">
          <Item.Content>
            <Grid>
              <Grid.Column mobile={6}>Name</Grid.Column>
              <Grid.Column mobile={3}>Category</Grid.Column>
              <Grid.Column mobile={2}>Start</Grid.Column>
              <Grid.Column mobile={2}>End</Grid.Column>
              <Grid.Column className="text-center" mobile={3}>
                Duration
              </Grid.Column>
            </Grid>
          </Item.Content>
        </Item>

        {/* Display tasks */}
        {props.tasks.map(task => {
          const { _id, name, category, startTime, endTime } = task;
          const { cName, cColor } = props.categories[category];

          return (
            <Task
              key={_id}
              name={name}
              categoryName={cName}
              categoryColor={cColor}
              startTime={startTime}
              endTime={endTime}
              duration={calculateDuration(startTime, endTime)}
            />
          );
        })}
      </Item.Group>
    </Card>
  );
};

export default DisplayTask;
