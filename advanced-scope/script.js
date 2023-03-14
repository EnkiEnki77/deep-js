//The idea of a compiler figuring out all the scopes ahead of execution, as well as the scopes being nested is called lexical scope. 
//The term lexical scope is related to the compiler.

//Nothing about what scope things belong in is figured out at runtime, its already been decided upon at compile time. 



//take the following issue:

var teacher = 'Kyle'

//someone comes along and puts this in between not knowing what they are doing
var teacher = 'Suzy'

console.log(teacher) //Kyle <-- this is now Suzy

//The principle of least exposure says you should default to making everything private, and only exposing what is necessary. It is
//one of the core principles of SE. It is a defensive practice  

var teacher = 'Kyle'

function anotherTeacher(){
    var teacher = 'Suzy'
    console.log(teacher)// Suzy
}

anotherTeacher() //pollutes scope with function name, allowing others access to use/misue it

console.log(teacher) //Kyle yay

//There are three reasons this is best practice. 
//1.If you hide sommething it greatly reduces surface area for name collisions
//2.If you hide something it makes it much harder for someone to misuse something like a function. 
//3.And most importantly if you hide something it protects your future self for refactoring. This is because, if you 
//expose something its almmost guaranteed someone will use it, and if they do you will break their code if you refactor. 



//We want to create scope to hide things, but also dont want to pollute the enclosing scope with a function name.
//So the solution is to utilize an IIFE statement. This declares and invokes the function all at the same time, so its identifier
//is not accessible. This allows you to utilize a scope to hide things, but also doesnt make the function name accessible for anyone
//to misuse, as well as allowing you to safely refactor the function in the future without the fear of breaking anyones code. 

var teacher = 'Kyle'

//The parens around this function turn it from a declaration to an expression, because the function keyword is no longer the first thing
//in the statement.
(function anotherTeacher(){
    var teacher = 'Suzy'
    console.log(teacher) //Suzy
})()

console.log(teacher) //Kyle yay

//Reminder, dont ever use anonymous functions. They make it more difficult to debug things. 

//IIFE's can be used any time you need an expression and any time you need a statement or scope in an expression position.

//This makes it more readable that teacher is only being assigned once, but if fetchTeacher returns a falsey value the catch assignment is
//defaulted to
var teacher = (function getTeacher(){
    try{
        return fetchTeacher(1)
    }
    catch(err){
        return 'Kyle'
    }
})()

//This is the same as above, but makes it look like teacher is assigned to more than once, but you cant assign the try catch to the variable
//because they are statements. Only expressions can be assigned to variables. Expressions are values or anything that executes to a value, such
//as a function.
var teacher;
try{
    teacher = fetchTeacher(1)
}
catch(err){
    teacher = 'Kyle'
}



//Block scoping is scoping thats done with curly braces, instead of with functions. 

//Same principle as with function scoping we use block scoping to hide something, protect a detail, protect refactoring, etc. 

//They are a bit lighter weight, and have less side effects meaning they dont redefine anything with returns, breaks, etc. 
//But they are not expressions, so they cannot be assigned to anything. But if you have  them in the place of a statement 
//they are the preferrable form of scoping. 

//You cant use var in block scopes, because var is functionally scoped, so it would just attach itself to the outer global or function 
//scope. You have to use let in these blocks, because let is block scoped. 

//let and const were added so that block scoping could be a thing without having to change var, which would break code. 

//A block is not a scope until it contains a let or const

//You should only use let in places where you would naturally want a variable to be confined to a block scope, such as in a for loop or 
//if statement. If you have a variable that needs to be accessed throughout the function or globally than use var. This is because 
//semantically var says "I am a variable that should be utilized throughout this function", whereas let says "I am a variable that should
//be confined to this small block of code."



//If you use let in a place that would generally be considered a block that let attaches itself to that block, meaning that you can now 
//no longer access it outside of it. So in some situations if you have confined variables but they need to be accessed outside of the block
//you should use var, such as the example below. 

//something else var can do let cant is declare the same variable more than once in the same scope. 

//This allows you to redeclare a variable anywhere you need to making it obvious what scope it belongs to without a reader having to 
//scroll way up to figure it out, an example would be in a 200 line function where a variable is used at the top and bottom for instance.

function lookupRecord(searchStr){
    try{
        var id = getRecord(searchStr)
    }
    catch(err){
        var id = -1
    }

    return id; //id would not be accessible here if let or const was used in the try catch. But var hoists it to the top of lookupRecord's scope. 
}

//The alternative with let would be this, but the more lines of code you add to this the further you seperate the declaration from the 
//assignment the harder the code is to understand. 

function lookupRecord(searchStr){
    let id;
    try{
     id = getRecord(searchStr)
    }
    catch(err){
     id = -1
    }

    return id;  
}



//If you have a variable anywhere that only needs to exist for a couple lines of code use let and wrap it in a block. 

function formatString(str){
    //This indicates semantically none of this code is necessary to access anywhere else. You should put the let's on the same line
    //as the opening brace to signify they belong to that block. 
    //This is called an explicit let block, it narrows the scopes where you actually use your variables. 
    {let prefix, rest 
        prefix = str.slice(0,3)
        rest = str.slice(3)
        str = prefix.toUpperCase() + rest
    }

    if(true){
        return str
    }

    return str.slice(4)
}



//You should only use const for primitives that should be immutable, and will be used more than once. Such as an API url. 



//Hoisting isnt real, its just a way for people to make sense of how lexical scope works without actually thinking about the fact your
//programs are run in two passes.

//The reason the engine can know about variables in the source position that havent been declared yet is because of the fact those 
//variables are determined to exist in that scope at compile time, before the program ever runs. This is one of the main aspects of 
//lexical scope. 

console.log(student);
teacher;
var student = 'you';
var teacher = 'Kyle';

