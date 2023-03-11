// JS implicitly conducts type coversions as needed. The semantics of how and when conversion is conducting is determined by abstract 
// operations. Theses operations are conceptual functions utilized to determine in what way type are coerced based on the circumstance.

// Type conversion and coercion are interchangeable.

// Abstract operations are not functions that can be called, they are conceptual algorithmic instructions that JS utilizes under the hood
// in certain circumstances that call for them, such as for implicit coercion. 

// The first abstract operation is ToPrimitive. It is utilized to coerce a non primitive type to a primitive for operations where a non 
// primitive is used, but a primitive is required, such as with concatenation or arithematic. 
// ToPrimitive(hint) takes an optional type hint that tells it which primitive youd like it to coerce to. If youre conducting a an operation
// involving numbers than it will give number as a hint, if string based string will be the hint. 

// JS's algorithms are inherently recursive, meaning that they will continulously be invoked until they return the desired kind of output.
// for example if ToPrimitive is invoked but doesnt return a primitive the first time around it will continuously be invoked until it does.

// There are two methods that are generally available on a non primitive, they are valueOf and toString. If the hint given to ToPrimitve is
// number it first attempts to utilize valueOf for coercion, if a primitive is given back then we're done. If it doesnt or it doesnt exist
// than toString is tried, if that doesnt work an error is thrown. If the hint is string than toString is started with.

const toPrimitive = [1] + 'hey'

console.log(toPrimitive)



// The next abstract operation is ToString. It takes any value and coerces it to its string form. Almost every value has a string form. 
// For the most part ToString gives back the string value youd expect for most things. If you call ToString on an object however it will
// invoke the ToPrimitive operation with the string hint. 

console.log(String(null))
console.log(String(undefined))
console.log(String(0))
console.log(String(false))
console.log(String(true))

// Arrays coerced to a string have any brackets left off, any content within the array is left in the string, unless the content is null or
// undefined then it is also left out even though null and undefined are stringed if ToString is called on them by themselves. 

console.log(String([]))
console.log(String([1,2]))
console.log(String([true]))
console.log(String([null]))
console.log(String([undefined]))
console.log(String([[]]))

// By default using ToString on an object returns this "[object Object]"

console.log(String({}))
console.log(String({a: false}))



// Next is the ToNumber abstract operation which is invoked any time you conduct an operation that requires a number, but one or more sides
// of the operation is not one. 

// Most ToNumber conversions are pretty sensible if the string is a number it is coerced to that number, if there is any trailing whitespace
// or zero's in front of the number they are stripped off, if the string is a character than NaN is returned, it handles hexidecimal. 
// where things get weird is when empty strings are involved, those just become 0. false is 0, true is 1, null is 0, undefined is NaN

// when it is used on an object ToPrimitive is invoked with the number hint. 

// By default valueOf invoked on an object returns the this of that object, meaning ToPrimitive will recursively be invoked again invoking 
// toString. So the numberification of an object is actually the stringification of it, the stringification is then coerced to a number by 
// ToNumber. 



// ToBoolean does not invoke any other algorithms, it simply does a look up to see if the value that invoked ToBoolean is in the list of spec
// defined falsey values, if it is false is returned, else true is returned.

// The falsey values in JS are "", 0, NaN, null, undefined, and false. 



// If you are using the + operator if both sides are a number then it is an arithematic operation. If either side is a string than it becomes
// string concatenation, and if there is a side that isnt a string the ToString algorithm coerces that value into a string. 

// You can throw any value into an array and then call .join("") on it and it will ToString it. [var].join("")

// Theres also the toString() method. 

// You can also use the built in String() object

// Some ways to forcibly coerce to numbers are using the unary + operator in front of a value, this invokes the ToNumber algorithm

let students = '15'
console.log(students, typeof students)
console.log(students, typeof +students)

// Or you can use the Number built in object

console.log(students, typeof Number(students))

// The - is only meant for numbers, so it will invoke ToNumber

console.log(students, typeof -students)
students -= 8
console.log(students)

// With booleans instead of relying on implicit coercion for your conditionals which can have corner cases it is better to be more explicit/

//for conditionals involving numbers use comparison operators.

//wrong 
//expected to return false if length comes back as 0, but what if it comes back as NaN?
while(students.length){

}

//right
while(students.length > 0){

}

//for conditionals involving strings use the Boolean built in object

//wrong
//expected to return false if empty string, but what if string just has a bunch of white space?
if(studentInput.value){

}

//right
if(!!studentInput.value){
    
}

//The two situations its okay to use implicit boolean coercion is when you are expecting either an object or null/undefined. But because 
//number/string boolean coercion have so many corner cases its better to be explicit with those. 



//You are able to use properties such as length on primitives because of an implicit coercion principle called boxing. 

//Basically, JS sees you have this value that is not an object, but you are trying to use it as if it is by calling .length, so JS coerces 
//into an object. 

//This is where the idea comes from that everything in JS is an object. 



//These are the type coercion corner cases in JS

//For ToNumber:

Number('')   //0 oops empty string is always coerced to 0

Number('   ')   //0 oops  ToNumber gets rid of all whitespace before coercing, so it becomes ''

Number(null)   //0 oops null is somehow 0, but undefined is NaN?

Number(undefined)   //NaN

Number([])   //0 ToPrimitive called with the number hint returns this which recursively calls ToPrimitive again with toString, stringifies
             //the array, stringified arrays lose their brackets, making the array "", "" is a primitive so it is put back into ToNumber
             //evaluating to 0

Number([1,2,3])   //NaN ToPrimitive is called with the number hint, meaning the array gets stringified losing its brackets. "1, 2, 3"
                  //is then put back into ToNumber, which is NaN

Number([null])   //0 oops null and undefined act as if they dont exist when placed in an array being coerced toString

Number([undefined])   //0 oops

Number({})   //NaN oops empty objects are coerced into '[object Object]' by ToPrimitive which when put back into ToNumber is NaN

String(null) //"null"

String(undefined) //"undefined"

String([null]) //"" null and undefined act as if they dont exist when placed in an array being coerced toString

String([undefined]) //"" null and undefined act as if they dont exist when placed in an array being coerced toString




