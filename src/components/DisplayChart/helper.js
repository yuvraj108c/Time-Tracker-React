import { getDurationInHours } from "../../utils/calculateDuration";

export const computeChartData = tasks => {
  let timePerCategory = {};
  let labels = [];
  let data = [];
  let backgroundColor = [];
  let totalTime = 0;

  tasks.forEach(task => {
    const taskCategory = task.category[0];
    const taskDuration = getDurationInHours(task.startTime, task.endTime);

    totalTime += taskDuration;

    timePerCategory[taskCategory.name] = {
      sum:
        timePerCategory[taskCategory.name] === undefined
          ? taskDuration
          : timePerCategory[taskCategory.name].sum + taskDuration,
      color: taskCategory.color
    };
  });

  Object.keys(timePerCategory).forEach(c => {
    labels.push(c);
    data.push(timePerCategory[c].sum.toFixed(2));
    backgroundColor.push(timePerCategory[c].color);
  });

  return { labels, backgroundColor, data, totalTime };
};
