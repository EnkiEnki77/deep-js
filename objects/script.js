//A functions this keyword references the execution context in which it was called, determined entirely by how the function is called. 
//The definition of the function doesnt matter at all when it comes to its this. 

//Function declarations and expressions have a dynamically scoped this.

//Arrow functions have a lexically scoped this

//Because this is dynamically scoped you can have a this aware function with a different reference for this each time its called. 

var teach = 'Kyle'

function ask(question){
    console.log(this.teach, question)
}

function otherClass(){
    var myContext = {
      teach : 'Suzy'
    }
    

    ask.call(myContext, 'Why?') //To tell the function what its this should be, you have to execute the method call, and pass it the object
    //youd like to attach this to. This becomes a reference to that object. 
}

otherClass()

//There are four different ways to call a function, and each way answers the question of what is this differently. 



//The first way to invoke a function is through implicit binding.

//We have a namespace object with a method that is this aware. 

var workshop = {
    teacher: "Kyle",
    ask(question){
        console.log(this.teacher, question)
    }
}

//When you call the method of a namespace object, this is determined to be the namespace, because its called from that object. 
//This is called implicit binding.
workshop.ask("what is for dinner")

//Implicit binding is how we share behaviour across multiple contexts. Here we have a method that has two different objects as its this 
//context. When you use that reference to invoke the ask function implicit binding says execute that function with the context being 
//whatever object its being invoked from. 

function ask(question){
    console.log(this.teacher, question)
}

var workshop1 = {
    teacher: "Kyle",
    ask:ask
}

var workshop2 = {
    teacher: "Kyle",
    ask: ask
}

workshop1.ask('shutup') //The this context for ask is workshop1

workshop2.ask('shutup') //The this context for ask is workshop2


//The second way to invoke a function is with explicit binding, this is done with the .call method like the example above. 

//Another way to go about explicit binding is with the bind method.

var workshop = {
    teacher: "Kyle",
    ask(question){
        console.log(this.teacher, question)
    }
}

setTimeout(workshop.ask, 10) //You would think that the this of ask would be workshop due to implicit binding, but no, since its a callback
//it loses its this binding to workshop, so this would be undefined. In this scenario though this would be global, because setTimeout invokes
//its callbacks with .call(window)

//The solution is to make the callback hard bound to the desired context. The bind method takes away the flexibility of this, and it says 
//invoke this function, but no matter how its invoked the context will always be this given context. this is great because its so flexible,
//but somethimes that flexibility bites us, which is why we have bind.
setTimeout(workshop.ask.bind(workshop), 10)


//Keep in mind that if youre having to use .bind on every or most method calls that youre basically not getting any of the benefits of this, 
//and itd be better just to utilize closure and modules. 



//The third way to invoke a function is with the new keyword. The purpoose of the new keyword is to invoke a function with the this keyword
//pointing to a new empty object. 

//The four things the new keyword does are 
//1. creates a new empty object.
//2. links that new object to another object
//3. calls the function with its this linked to the new object.
//4. if the function does not return its own object it assumes you meant to return this



//The fourth way to invoke a function is through default binding.

//If you attempt to invoke a this aware function that does not have a this context the default binding sets this to global, unless youre in
//strict mode, then it is set as undefined. If you are using a transpiler such as babel the default is for everything to be in strict mode. 

//You would never want a function to default bind to global

//Rememebr to determine the this of a function dont look at the function, look at the call site. 



//The order of precedence when determining what this will be is

//1. new
//2. explicit binding
//3. implicit binding
//4. default binding. 



//Arrow functions have a lexical this, or rather arrow functions do not define a this keyword at all, which means if you put a this in one it
//will act exactly like any other variable, which means it will lexically resolve to the nearest enclosing scope that does define a this, and
//is then set to be whatever that this is. 

var workshop = {
    teacher: "Kyle",
    ask(question){
        //The arrow function here lexically looks for a this bound environment. The first this bound environment it comes across is the ask
        //function, its this is implicitly bound to the namespace workshop as shown below, so the arrow functions this becomes the same as ask's
        setTimeout(() => console.log(this.teacher, question), 1000) 
    }
}

workshop.ask('Is this lexical this?')//defines this for ask and enclosed arrow function

//From the spec it says arrow functions do not define local bindings for arguments, super, this, or new.target. Any references to thes in an
//arrow function must resolve to the nearest binding in a lexically enclosing environment. 

//To prove arrow functions arent hard bound to their parent object, and dont define a this. If arrow functions were hard bound you should be
//able to call new on them and override their this, but because they dont define a this new cant be used. 



//Keep in mind, objects are not scopes, they are not this aware, so if an arrow function has no enclosing this context to latch onto it will
//latch onto global. Likewise, arrow functions cannot be attached to a context based on invocation because they do not define their own this.

var workshop = {
    teacher: "Kyle",
    //ask here is attached to the global this, because there is no enclosing context bound to this
    ask: (question) => console.log(this.teacher, question)
}

//Arrow functions do not define their own this so bindings do not create a context for the function
workshop.ask('Is this lexical this?')

//The only time you should use arrow functions is if you will gain benefits from the lexical this binding. Such as when youre using this
//in a callback and want this to attach to a parent function. 

//If youre going to use arrow functions for their lexical this you need to combat the downsides of arrow functions. That they dont have a 
//self reference for recursion or binding, they dont have a name you should give them a name by assigning them to a variable or property, and
//make it clear what the purpose of the function is dont make them read the function body to figure it out. 



//The class system is a syntactic sugar layered over the prototype system. 

//Classes dont have to be statements, they can be expressions and they can be anonymous. 

class Workshop{
    //This is optional and defines the params that are taken in when the class is instantiated into an object with the new keyword.
    //These params are accessible in any methods of the class. 
    constructor(teacher){
        this.teacher = teacher
    }

    ask(question){
        console.log(this.teacher, question)
    }
}

//Utilizes the new keyword to create an object with the class as the blueprint of what that object should look like 
var deepJS = new Workshop("Kyle")

deepJS.ask('Kyle is class')

//If you would like to extend a class into another class use extends
class Workshop{ 
    constructor(teacher){
        this.teacher = teacher
    }

    ask(question){
        console.log(this.teacher, question)
    }
}

//The same as taking the contents of the Workshop class and putting it in this class.
class AnotherClass extends Workshop{ 
    speakUp(msg){
        this.ask(msg)
    }
}

var deepJS = new AnotherClass("Kyle")

deepJS.speakUp('Kyle is class')

//There is a super keyword that allows for polymorphism

class Workshop{ 
    constructor(teacher){
        this.teacher = teacher
    }

    ask(question){
        console.log(this.teacher, question)
    }
}

//If you have a child class with a method named the same as one in the parent you can refer to the parent method using super. 
class AnotherClass extends Workshop{ 
    ask(msg){
        super.ask(msg)
    }
}

var deepJS = new AnotherClass("Kyle")

deepJS.ask('Kyle is class')









