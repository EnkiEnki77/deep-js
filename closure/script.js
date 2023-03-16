//A foundational understanding of lexical scope is extremely important for understanding closure. 

//Closure is when a function remembers and is able to access its lexical scope even when the function is executed outside of that lexical 
//scope. 

//The first part of this definition is just normal lexical scope, but the second part when you take a function and pass it as a callback 
//or return it from a function, and the scope it was defined in has conceptually gone away you would think normally its been garbage collected
//and is done, but there is a function that survived and it turns out that function is able to hold onto the reference of the scope it was 
//born in and wherever you pass that function from then on that reference remains. That is closure



//An example of closure is a timer using setTimeout

function ask(question){
    setTimeout(function waitASec(){
        console.log(question)
    }, 100)
}

ask('what is closure')// successfully prints

//You would think the above function would throw an error. setTimeout is async, meaning by the time its callback runs ask has already been 
//finished, so shouldnt waitASec's reference to question come back as an error? No, because of closure waitASec retains access to its lexical
//scope which includes the param question. 

//Functions only close over the lexical data they utilize. 

//Another example of closure is returning a function from another function



var myQuestion = counter()

//Remember that when you pass an argument to a cloured function, if the function is utilizeing the param as its closure, then anytime
//you call the function the param is being reassigned, so the closure will just be the same thing over and over. For a counter for 
//example the closured count variable needs to be initialized in the lexical scope of the closure. 
console.log(myQuestion()) //1
console.log(myQuestion()) //2
console.log(myQuestion()) //3
console.log(myQuestion()) //4
console.log(myQuestion()) //4

function counter(){
  var count = 0;
  return function increment(){
      return count++
  }
}



//Closure does not close over a snapshot of the values in the surrounding scope, it closes over the variables themselves with whatever
//value they currently have in the moment the function is executed. So dont think of closure as capturing values, think of it as preserving
//access to variables. 



//A place closures can be really confusing is when dealing with loops, such as below, or more realistically when assigning click handlers
//to an array of buttons.

var i = 0;

//There's only one variable in the enclosing scope, but whenever we iterate the loop a new function is being executed, each one closing over
//that same variable. Whenever a variable is closed over and it is reassigned that resassignment is visible in all functions that have closure
//over it. So if 3 different functions close over the same variable and that variable is assigned to 4. The value of the variable in all
//3 closures will be 4. This is because again closures do not close over values of a variable at a certain point in time. They close over 
//the identifier itself and give eternal refernece to it.
for(var i = 1; i <= 3; i++){
    setTimeout(function(){
        console.log(i)
    }, i * 1000)
}

//4
//4
//4

//So in the case of a loop you need a different variable for each function to close over. One way to do this is to create a new variable 
//for every iteration of the loop. It should be a let variable so it is confined to the scope of the loop.
for(var i = 1; i <= 3; i++){
    let j = i;
    setTimeout(function(){
        console.log(j)
    }, j * 1000)
}

//1
//2
//3

//A feature was implemented where if you make the loop variable let than it automatically creates a new variable for each iteration.
for(let i = 1; i <= 3; i++){
    setTimeout(function(){
        console.log(i)
    }, i * 1000)
}

//1
//2
//3



//You need to understand closure to understand the module pattern, you need to understand lexical scope to understand closure. 

//A very common pattern people may confuse for a module is the name space pattern. It is a pattern where you have a set of behaviour like 
//functions and a set of data that behaviour operates on and you want to collect them together into some logical unit. The simplest way 
//is to make an object and put your data/functions on the object. 
//Taking an object and collecting a set of functions and data and adding them to the object as methods/properties is known as adding them
//to a name space. 

var workshop = {
    teacher: 'kyle',
    ask(question){
        console.log(this.teacher, question)
    },
}

workshop.ask('is this a module?')

//this is a common pattern in js, but it is not a module, and what seperates it from being one is the fact its not encapsulated. All
//of its properties are globally available. Encapsulation is the idea of hiding data and behaviour.

//The idea of a module is there are things that are public, thats your public API, and there are things that are private, that no one can touch.
 
//Modules encapsulate data and methods together. The (state) data of a module is held by its methods via closure. 

//You cant have modules without closure. 

//The old school module pattern looks like this.
//Encapsulation is achieved through making the module an IIFE. Its public API is made accesible through assigning the return of the IIFE
//to a variable

var workshop = (function Module(teacher){
    var publicAPI = {ask, }
    return publicAPI

    //the reason this function is accesible after the return is because it is a declaration, so its known by the scope at compile time. 
    //You should always put utils below executable code. 
    function ask(question){
        console.log(teacher, question)
    }
})('Kyle')

workshop.ask(',this is a module, right?')//Kyle, this is a module, right?

//The idea is that you have some hidden state, that cannot be accessed from the outside, but the functions that have closure over them
//can, and you make those functions accessible in an object you return. 

//The whole purpose of a module is to track/change state over time. 

//If you have a "module" that doesnt have any state, or it doesnt change, than its not a module. 

//The point of a module is you have some stuff you have closure over and you are controlling access to it by exposing a minimal API. 

//The principle of minimal exposure is in full effect here. 

//You have modules which can only be called once like the IIFE module above, but you can also use function declaration to make them reusable.
//These are known as factory functions. 

function Module(teacher){
    var publicAPI = {ask, }
    return publicAPI


    function ask(question){
        console.log(teacher, question)
    }
}

var workshop = Module('Kyle') 

workshop.ask(',this is a module, right?')//Kyle, this is a module, right?


