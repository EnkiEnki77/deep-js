//JS has corner cases with its type coercions. That doesnt mean you should straight up avoid type coercion. It means you should adapt 
//a coding style that makes value types plain and obvious. 

//A quality js program embraces coercion, and ensures types are clear, therefore avoiding corner cases. 

//When writing code comments dont just write what a piece of code is doing, but also why its doing that in that specific place. 

//The implicit abstraction within JS is useful removing unnecessary detail from your codebase, bringing more clarity to the important things.
//There's no need to be extremely explicit in every situation, thats distracting. 

//An example of a situation where you may be being too explicit

let student1 = 12
let student2 = studentInput.value

//Would be the way to go if its possible both sides will be strings, because in that instance an alpha numeric comparison is made. 
if(Number(student1) > Number(student2)){

}

//The way to go every other time, because as long as at least one side is a number comparison operators coerce the other side to a number 
if(student1 > student2){
    
}

//Rule of thumb is to ensure that you are explicit with your types only in places they are not obvious. 
//Ask yourself the question, is showing the extra type details useful for the reader in this situation? 

