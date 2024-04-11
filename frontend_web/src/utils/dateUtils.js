export const convertTimeToDate = time => {
    return new Date(time).toLocaleDateString('en-GB');
}

export const convertDateToTime = date => {
    const [day, month, year] = date.split('/');
    return new Date(year, month - 1, day, 0).getTime();
}