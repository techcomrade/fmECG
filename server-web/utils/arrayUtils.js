const convertArrayToString = (array) => {
    return `(${array.toString()})`
} 

const dummyArray = (length) => Array.from({length}, () => Math.floor(Math.random() * length));

module.exports = {
    convertArrayToString,
    dummyArray
}