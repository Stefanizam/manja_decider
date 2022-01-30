export const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const secondsPerWeek = 604800;

    if (seconds > secondsPerWeek*2) {
        return "rgb(255,0,0)";       // Red
    }
    if (seconds > secondsPerWeek && seconds <= secondsPerWeek*2) {
        return "rgb(245, 241, 29)";  // Yellow
    }
    if (seconds <= secondsPerWeek) {
        return "rgb(100,255,100)";   // Green
    }
}