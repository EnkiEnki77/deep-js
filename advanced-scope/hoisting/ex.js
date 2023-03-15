//Utilize function hoisting to have all executable code at the top of your program, variables should be at very top, because hoisting with 
//variables is generally undesirable and functions at the bottom.
//In places where function expressions are used (callbacks are function expressions, because they are being used as a value assigned to a
// param) The function expression should only be inlined if it utilizes lexical variables of the surrounding scope 
//Otherwise they should be taken out into the outermost scope they can as declarations, and passed in by identifier. All of this makes things
//more readable.


printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

function getStudentFromId(studentId) {
	return studentRecords.find(matchId);

	function matchId(record){
		return (record.id == studentId);
	}
}

function sortByNameAsc(record1,record2){
	if (record1.name < record2.name) return -1;
	else if (record1.name > record2.name) return 1;
	else return 0;
}

function printRecords(recordIds) {
	var records = recordIds.map(getStudentFromId);

	records.sort(sortByNameAsc);

	records.forEach(printRecord);
}

function printRecord(record){
	console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
}

function paidStudentsToEnroll() {
	var recordsToEnroll = studentRecords.filter(needToEnroll);

	var idsToEnroll = recordsToEnroll.map(getStudentId);

	return [ ...currentEnrollment, ...idsToEnroll ];
}

function needToEnroll(record){
	return (record.paid && !currentEnrollment.includes(record.id));
}

function getStudentId(record){
	return record.id;
}

function remindUnpaid(recordIds) {
	var unpaidIds = recordIds.filter(notYetPaid);

	printRecords(unpaidIds);
}

function notYetPaid(studentId){
	var record = getStudentFromId(studentId);
	return !record.paid;
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
