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
    const dateKeyGroups = ["birth", "start_date", "start_time", "end_time","end_date"];
    return dateKeyGroups.includes(key);
}

export const checkListTypeKey = (key) => {
    const dateKeyGroups = ["frequency", "storage", "connection"];
    return dateKeyGroups.includes(key);
}

export const CheckKeyNeedDisplayTag = (key) => {
    const tyepKeyGroups = ["status","role","device_type"];
    return tyepKeyGroups.includes(key)
}

export const dummyArray = (length) => Array.from({length}, () => {
    const value = Math.floor(Math.random() * length);
    return {
        value,
        warning: value > 800 ? 1 : 0
    }
});

export const dummyIncreaseArray = (length) => Array.from(Array(length).keys());
