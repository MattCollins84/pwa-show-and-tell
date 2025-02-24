const getUserDateFormat = (): string => {
  const testDate = new Date(2000, 1, 15); // February 15, 2000 (Month is zero-based)
  const formattedDate = new Intl.DateTimeFormat(undefined).format(testDate); // Uses user's locale

  // Check the position of day, month, and year
  const day = "15";
  const month = "2";

  if (formattedDate.startsWith(day)) {
    return "dd/MM/yyyy";
  } else if (formattedDate.startsWith(month)) {
    return "MM/dd/yyyy";
  } else {
    return "yyyy/MM/dd";
  }
}

export default getUserDateFormat