//The difference between == and === is not that one checks for type and one doesnt, they both check for type. The difference is that == 
//allows for coercion and === doesnt. 

//When the types match the algorithm used under the hood for both and == and === is exactly the same IsStrictlyEqual algorithm is used. 
//which is the algorithm the === uses 100% of the time. 

//With IsStrictlyEqual the types are checked, and if they are not the same false is returned, if they are the same various other algorithmic
//steps are run through to ensure the values match.

//When == is used if the types do not match than the IsLooselyEqual algorithm is utilized under the hood which recursively attemps to coerce
//the values to the same type to then finally be passed to the IsStrictlyEqual algorithm. 

//Two objects initialized under different identifiers will never be equal because js compares objects based on identifiers. 

const obj1 = {
    hey: 43
}

const obj2 = {
    hey: 43
}

obj1 == obj2
obj1 === obj2
//both would return false because although these objects have the same content they have different identifiers 



//The is IsLooselyEqual algorithm first checks if the types are the same, if they are it passes the values to the IsStrictlyEqual algorithm
//If not it checks if they are both null or undefined, if they are it returns true automatically.
//If not it checks that both are primitive types, if they are it attempts to coerce both to a number and run them through the algorithm again.
//If one is an object it is coerced with ToPrimitive and run through again. 
//If they are both objects false is returned. 

//null and undefined are treated as indistinguishable through coercive equality. So if you need to check if something is null or undefined
//dont use === and check every single case, use == and just check for null. Because the coercive equality implicitly is also checking for
//undefined. 
//Again always ask yourself when dealing with types if the reader gains anything from you being explicit about things. 

//So with == if both values are the same type uses the exact algorithm as ===
//if both values are either null or undefined returns true
//if one side is a string and the other a number coerces the string to a number and passes them back in to the == algorithm
//if one side is a boolean coerces the boolean to a number and passes the values back in to the == algorithm
//if one side is an object coerces it to a primitive with ToPrimitive algorithm and then passes values back into == algorithm
//if both sides are an object returns false. 



//If youd like to do any sort of coercion in a equality check its better to just make sure you know what the possible types are and use ==
//you should structure your code where the types are restricted in a way that they are always obvious, thus allowing implicit coercion to 
//be acceptable. 



//You should not do equality checks between primitives and non primitives. Because they will sometimes result in being equal only by accident
//really, because of how coercion works with non primitives. This is one of the corner cases of coercion that are actually bad. The solution
//is not to protect against this with === though, it is again to ensure you know what your types are and to not do equality checks between
//primitives and non primitives. Dont make terrible comparisons in the first place, code in a way to where your comparisons always make sense.



//If you put ! before a value it coerces it to a boolean. If its a truthy value it negates it to falsey, and vice versa



//Boolean corner cases with == 

let workshopStudents = []

if(workshopStudents){
    //true, because [] is a truthy value
}if(workshopStudents == true){
    //false, because if one side of == is an a primitive ToPrimitive is called on it. In this case the array is stringified to "", and ""
    //is falsey.
}if(workshopStudents == false){
    //true, because of the above reasoning. 
}

//Dont ever do a == with true or false, because there is no scenario where it wouldnt be better just do the implicit ToBoolean version, 
//and it avoids corner cases of == that way. 



//Avoid == when either side could be a 0, "", or " "
//Avoid == with non primitives.
//Avoid == with true or false, use the implicit ToBoolean or === if it has to be exactly true or false



//You should always prefer == except in the above cases. == is not about comparisons with unknown types, you should never use it in that 
//situation, you should always strive to know your types. 

//If both types are the same than we know that == and === are equivalent, so just use == because === is unnecessary

//If the types are different than a === would always break, so use ==. You could possibly do the equivalent which would be two seperate ===
//checks, but that is much more typeing, just for the sake of being explicit, when you dont need to be. 

//If you dont know the types in your program you dont fully understand the program, so its best to refactor, so you do know the types. 

//If there is uncertainty about the types you should use === to indicate that. === Should be reserved for these cases. === should be a 
//semantic signal that you dont know anything about the types in your program. 


