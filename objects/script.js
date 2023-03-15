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





