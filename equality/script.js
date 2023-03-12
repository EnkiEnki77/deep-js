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

