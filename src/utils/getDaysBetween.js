// https://stackoverflow.com/a/11252167/7754670

function treatAsUTC(date) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

export default function getDaysBetween(startDate, endDate) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil(
    (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay,
  );
}
