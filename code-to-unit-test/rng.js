//this function generates a random number between the min and the max values
function randomNumGen(min, max) {
    if(typeof min !== "number" || typeof max !== "number") {
        throw new Error("Input must be a number");
    }
    
    if (min > max) {
        throw new Error("Min should be less than max");
    }
    else if (min === max) {
        return min;
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = { randomNumGen };