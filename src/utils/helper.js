function formatDate(inputDate) {
  const dateObject = new Date(inputDate);

  // Check if the dateObject is valid
  if (isNaN(dateObject.getTime())) {
    // If the date is not valid, return null or handle the error accordingly
    return null;
  }

  const formattedDate = dateObject.toISOString().split("T")[0];
  return formattedDate;
}
export default formatDate;
