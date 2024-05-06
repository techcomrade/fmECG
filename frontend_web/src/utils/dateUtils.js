export const convertTimeToDate = time => {
    return new Date(time).toLocaleDateString('en-GB');
}

export const convertDateToTime = date => {
    console.log(date);
    const [day, month, year] = date.split('/');
    return new Date(year, month - 1, day, 0).getTime();
}

export const getCurrentTimeToString = () => {
const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}