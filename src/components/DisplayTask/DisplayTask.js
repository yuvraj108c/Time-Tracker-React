import React from "react";
import { getDurationString } from "../../utils/calculateDuration";

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
              <Grid.Column computer={5}>Name</Grid.Column>
              <Grid.Column computer={3}>Category</Grid.Column>
              <Grid.Column computer={3}>Start</Grid.Column>
              <Grid.Column computer={3}>End</Grid.Column>
              <Grid.Column computer={2}>Duration</Grid.Column>
            </Grid>
          </Item.Content>
        </Item>

        {/* Display tasks */}
        {props.tasks.map(task => {
          const { _id, name, category, startTime, endTime } = task;

          return (
            <Task
              key={_id}
              name={name}
              categoryName={category[0].name}
              categoryColor={category[0].color}
              startTime={startTime}
              endTime={endTime}
              duration={getDurationString(startTime, endTime)}
            />
          );
        })}
      </Item.Group>
    </Card>
  );
};

export default DisplayTask;
