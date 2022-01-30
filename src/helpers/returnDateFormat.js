const returnDateFormat = (date, addTime) => {
  if (date && date !== undefined) {
    if (!addTime) {
      return date.slice(0, 10)
    }
    else if (addTime === "time") {
      let originalDate = date;
      let newDate = originalDate.slice(0, 10);
      let time = originalDate.slice(11, 16);
      return `${newDate}, ${time}`
    }
  }
}

export default returnDateFormat;