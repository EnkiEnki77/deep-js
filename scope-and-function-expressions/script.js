//The way compilation between function declarations and function expressions works is different. 

function declaration(){

}

const expression = function identifier(){

}

//One of the key differnces between function declarations and expressions is that declarations attach their identifier to the enclosing scope
//they are declared within, whereas expressions attach their identifier to the their own scope that they create. So with function expressions
//they can actually reference themselves.

//another nuance is not only do function expressions only show up in their own scope, but they are read-only. Meaning while you can reference
//it in its own scope, you cant reassign it to another value. 



//There are two kinds of function expressions, named and anonymous

const anonymous = function(){

}

const named = function named(){

}

//You should 100% of the time prefer name function expressions, there are 3 reasons.
//1: it provides a reliable function self reference, for recursion, if its an event handler of some sort and needs to reference itself to
//unbind itself, useful accessing properties such as length or name etc. 
//2: Makes things more debuggable in the stack trace. 
//3: Makes it more obvious what the function is for. 

//Every function has a purpose, which means every function should have a name. If you cant come up with a name it probably means the 
//function is too complex, and should be refactored into smaller functions. 

//Anonymous functions have absolutely no use other than to type less. 

//Rule of thumb prefer function declarations if the function is more than three lines of code, or needs to be called multiple times. Otherwise
//use an inline function expression. 

//Accept the fact that you will likely go back and refactor the code/name of a function as you discover more about what you need from it. 

//If you really cant come up with a name for a function start with the name ToDO, and  go look for them before you commit things. 

//Dont use arrow functions, because they are anonymous. Their only use should be for their lexical this. 

//You want readers to be able to understand your code at a glance. 

