//We know right off the bat the function to access a student record by its ID will be used more than once based on the spec
//so it should made into its own function declaration, when creating functions try to really think about the different situations
//you can use them. only make it into an inline expression if it trully only is used once, and is less than 3 lines long. 
function getStudentById(studentId){
	//The find method loops through a list and returns the first item of that list that matches the criteria of its callback. 
	return studentRecords.find(function matchId(record){
		return studentId == studentRecords.id
	})
}

function printRecords(recordIds) {
	const records = recordIds.map(getStudentById)

	//To sort the items of an array use the sort method. The sort method mutates the original array, so you dont really need to 
	//worry about the return value. The default is for it to sort in ascending order. To sort objects based on one of their keys
	//such as in this case you need to give sort a callback. The callback loops over each item of the array, and takes two params
	//the current item of the array, and the next item. You determine sort order by comparing the items.
	records.sort(function sortByNameAsc(record1, record2){
		//You can inline your conditional statements.
		if(record1.name < record2.name) return -1
		else if(record1.name > record2.name) return 1
		else return 0
	})

	//Use forEach if you need to conduct an operation on each item of an array, such as console logging a template literal with info from
	//each item embedded in. 

	records.forEach(function printRecord(record){
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`)
	})
}



function paidStudentsToEnroll() {
	//Filter loops through an array and returns a new array containing each item of the looped array that fulfills the criteria of the
	//callback function returning true. 
	const idsToEnroll = studentRecords.filter(function needsToEnroll(record){
		//includes loops through an array and checks to see if the array contains a certain value passed as an argument, returning true or
		//false based on the result. 
		return (record.paid && !currentEnrollment.includes(record.id))

		//You can chain array methods onto array methods if you need to loop through and manipulate a returned array. 
		//map loops through an array and returns a copy of that array containing results of a function that is executed on each item of
		//the array. 
	}).map(function getStudentId(record){
		return record.id
	})
	

	//Remember that if youre not getting the output you expect from a function to console log the return
	//create a new array containing the contents of multiple different ones using the spread operator. 
	return [...currentEnrollment, ...idsToEnroll]
}

function remindUnpaid(recordIds) {
	const unpaidIds = recordIds.filter(function isUnpaid(studentId){
		//remember to try to make your functions as reusable as possible and be creative about where and when to use them. 
		//also remember that array methods are normal functions so you can use outside function utilities in them. In this case
		//getStudentById is taking in the current studentId of the filter loop and returning the record based on that id. Filter can 
		//then do its check to see if that is the correct record. Each iteration of the loop the function is rerun.
		const record = getStudentById(studentId)
		return (!record.paid)
	})

	printRecords(unpaidIds)
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
