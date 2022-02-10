export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  const secondsPerWeek = 604800;

  if (seconds > secondsPerWeek * 2) {
    return "red";       // Red
  }
  if (seconds > secondsPerWeek && seconds <= secondsPerWeek * 2) {
    return "yellow";  // Yellow
  }
  if (seconds <= secondsPerWeek) {
    return "green";   // Green
  }
}