const convertTimeToString = (timestamps) =>{
    const date = new Date(timestamps)
    return date.toString();
}

const convertDateNormal = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
}

const convertStringToDate = (str) => {
    let [day, month, year] = str.split('/')
    const date = Math.floor(new Date(+year, +month - 1, +day).getTime() / 1000)
    return date;
}
module.exports = {
    convertTimeToString,
    convertDateNormal,
    convertStringToDate
}