//The kind of scope used in js is lexical scope. 
//scope is where to look for things, specifically identifiers.

//All variables are in one of two groups in your programs, being assigned to or being retrieved from. 

//When js comes upon an identifier it asks two questions, first what position is it in? (assignment or retrieval), and what scope
//does it belong to?

//JS is a parsed language, and the instructions for which identifiers belong to what scope are created at compile time, to then be executed
//and saved into memory at runtime.

//Proof that JS is parsed, and is not just interpreted is the fact that it can catch syntax errors, before the program is even executed. 

//In compiler theory there are essentially 4 stages to a compiler.
//lexing/tokenization
//parsing, which turns the stream of tokens into an AST and mapping out the scope environment along with the identifiers that belong in them.
//Lastly is code generation, taking the AST and turning it into the executable instructions the computer can understand. 

//JS organizes scope with functions and blocks. 

//When the compiler is creating the plan for scopes it goes line by line, when it reaches a formal declaration of a variable or function it
// first checks if that identifier already exists in that scope, if not it creates a place holder for that identifier in that scope. Keep in 
//mind, variables and functions are not created and saved into memory for real until runtime, but conceptually a plan is created. 

//When the compliler comes across a formal declaration that is a function it not only creates a placeholder for that identifier in the current
//scope, but also creates a new inner scope related to that identifier, it will then go through the block of code in the function and attach
//any formal declarations to the scope of that function. 

//Now when in the scope of a function when the compiler comes across a formal declaration, it will only look in that current scope to see if
//that identifier already has a placeholder. Meaning you can create a variable in a function that has the same name as one in the global scope.
//Because they belong to two different scopes they are treated as different identifiers. 

//Having two different variables in different scopes with the same name is called shadowing. This is fine, but how lexical scope works is
//if you have a variable of the same name in two different scopes and go to reference that variable it references the one in the nearest scope.

//In lexically scoped languages everything about scope is determined at compile time, so that the JS engine can be more effecient at run time.

//With a variable such as:
let teacher = 43;

//The compiler is only concerned with the declaration keyword and identifier aspect "let teacher". 
//The assignment to the identifier, which is stored in memory is handled at run time "teacher = 43", so at runtime all declaration keywords
//have basically been taken away, those things were already determined at compilation. 

//There are two positions a variable can be in, target when it is being assigned to, and source when a value is being extracted from it.

//This is something the compiler puts into the AST plan, not only what scope the variable belongs to but also what position it is in. 

//when a function is called the identifier is in the source position, this allows the js engine to enter the scope for that function.

//When a function is compiled there is a plan created with that identifier for an entirely new scope along with identifiers associated with 
//that scope. At runtime when the identifier for that function is in source position that plan is then utilized to create that scope, and
//the js engine is then it and running it. 

//Remember that at compile time nothing is actually created, a plan is just created for each scope. Runtime is when things are actually
//put into existence. Compiler output does not actually reserve memory, it is the plan for how to reserve memory. 

//A function declaration is a target reference, so at runtime the block of code associated with the function is saved to that identifier. 

//function identifiers hold a conceptual spot in memory for the body of the function, and when they are in the source position that function
//is executed and the plan for the creation of that scope is utilized.

//If an identifier with () at the end is in the source position, but null or undefined come back because that function has not been 
//declared you get back a type error, not a reference error. 

//functions have a scope, but they arent one.

//The compiler creates scope plan, but does not execute any code. Scope plan only cares about formal declarations of identifiers. It does
//not care about the assignments to those identifiers or source references. 

//remember that if you have a target reference to an identifier that also exists in a higher scope, but there is no formal declaration for
//the identifier in the scope youre currently in the reassignment will happen on the identifier of the higher scope. 

//If you make a target reference to an identifier that hasnt been formally declared, than when the engine reaches global scope and asks for it
//global scope makes it into a global variable with the value assigned to it that was given in the target reference. You should never auto 
//create globals like this, its bad. Always declare the variables youd like to use. 

let teacher2 = 'Kyle' 

function otherClass(){
    teacher2 = 'Suzy'
    topic = 'React'
    console.log('welcome!')
}

otherClass()

console.log(teacher2);
console.log(topic);

//In lexical scope if an identifier is in source position but cant be found in that scope the engine looks in the nearest above scope until
//its looked through them all, if the identifier is not found in any scope an error is thrown. 

//When you have an identifier in either the target or source position the engine always has to first look it up in the execution plan.

//You should be using strict mode, turn it on by putting "use strict" at the top of your script. 

//When you have a parameter for a function even though there isnt a declaration keyword it is a formal declaration for the scope of that 
//function, and when you pass an argument to that param on call of the function you are putting that param in the target position. 

//If you have a target reference to an undeclared variable the global scope creates that variable, but if you have a source reference to
//an undeclared variable you get a reference error. At least in non strict mode, in strict mode they both throw  a reference error. 

//Undefined means the identifier has been declared in a scope, but it doesnt currently have a value assigned to it. Undeclared means the
//identifier has never been declared in a scope we have access to. 




