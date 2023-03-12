// TODO: write the validation functions

//My version
const isValidName = (name) => {
    if(typeof name == 'string' &&
        //The trim method allows you to trim whitespace off a string.
        name.trim() != '' &&
        name.length > 2){
        return true
    }else{
        return false
    }
}

const isValidName2 = (name) => {
    if(typeof name == 'string' &&
        //can put this all in one line, because any trimmed string with a length more then two implicitly is already not a ""
        name.trim().length > 2){
        return true
    }else{
        return false
    }
}


//when creating functions that can take in strings or numbers but that treat them as numbers you should always do type guards against empty
//strings using the trim method and against NaN using isNaN.
const hoursAttended = (attended, length) => {
    if(typeof attended == 'string' && attended.trim() != ""){
       attended = Number(attended)
    } if(typeof length == 'string' && length.trim() != ""){
       length = Number(length)
    } if(typeof attended == 'number' && typeof length == 'number' 
        && Number.isInteger(attended) && Number.isInteger(length) &&
        attended <= length &&
        !isNaN(attended) && !isNaN(length) 
         ){
        return true
    }else{
        return false
    }
}

// tests:
// console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);

// console.log(isValidName(false) === false);
// console.log(isValidName(null) === false);
// console.log(isValidName(undefined) === false);
// console.log(isValidName("") === false);
// console.log(isValidName("  \t\n") === false);
// console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);
