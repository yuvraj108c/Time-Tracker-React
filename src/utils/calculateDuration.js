import moment from "moment";

export const getDurationString = (startTime, endTime) => {
  //   Calculate duration
  const start = moment(startTime, "HH mm");
  const end = moment(endTime, "HH mm");
  const durationInMillis = moment.duration(end.diff(start)).as("milliseconds");

  return moment.utc(durationInMillis).format("HH:mm");
};

export const getDurationInHours = (startTime, endTime) => {
  //   Calculate duration
  const start = moment(startTime, "HH mm");
  const end = moment(endTime, "HH mm");
  const duration = moment.duration(end.diff(start)).as("hours");

  return duration;
};
