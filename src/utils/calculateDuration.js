import moment from "moment";

const CalculateDuration = (startTime, endTime) => {
  //   Calculate duration
  const start = moment(startTime, "HH mm");
  const end = moment(endTime, "HH mm");
  const durationInMillis = moment.duration(end.diff(start)).as("milliseconds");

  return moment.utc(durationInMillis).format("HH:mm");
};

export default CalculateDuration;
