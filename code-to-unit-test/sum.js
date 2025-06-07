//this is a temp file to test the code-to-unit-test repo
 function sum(a,b){
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

module.exports = { sum };