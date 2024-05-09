export const addKeyElement = (arr) => {
    const newArr =  arr.map((element, index) => ({
        ...element,
        key: element.id
    }))
    return newArr;
}

export const findElementById = (arr, value) => {
    return arr.find(obj => obj.id === value);
}

export const objectArrayValues = obj => Object.values(obj);

export const toggleElement = (arr, val) => arr.includes(val) ? arr.filter(item => item !== val) : [...arr, val];

export const checkDateTypeKey = (key) => {
    const dateKeyGroups = ["birth","start_date","end_date","created_at","updated_at"];
    return dateKeyGroups.includes(key);
}