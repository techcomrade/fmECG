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