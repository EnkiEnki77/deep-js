// TODO: write `findAll(..)`

const findAll2 = (value, arr) => {
	const matchedArr = []

	//my solution
	for(let i = 0; i < arr.length; i++){
		if(Object.is(arr[i], value)){
			matchedArr.push(arr[i])
			if(Object.is(value, -0) || isNaN(value)){
				break;
			}
		}else if(
			typeof value == 'string' &&
			typeof arr[i] == 'number' &&
			value != "" && 
			!Object.is(arr[i], -0) &&
			value == arr[i]
		){
			matchedArr.push(arr[i])
		}else if(
			typeof value == 'number' &&
			Object.is(arr[i], String(value))
		){
			matchedArr.push(arr[i])
		}else if(
			value == null &&
			arr[i] == null
		){
			matchedArr.push(arr[i])
		}else if(
			typeof value == 'boolean' &&
			typeof arr[i] == 'boolean' &&
			arr[i] == value
		){
			matchedArr.push(arr[i])
		}
	}
	
	console.log(matchedArr)
	return matchedArr
}

const findAll = (value, arr) => {
	const matchedArr = []

	//solution
	for(let v of arr){
		if(Object.is(value, v)){
			matchedArr.push(v)
		}else if( value == null && v == null){
			matchedArr.push(v)
		}else if(typeof value == 'boolean' && typeof v == 'boolean' && value == v){
			matchedArr.push(v)
		}//have to be careful about -0 here, the Object.is above only protects against -0 if they are both -0. Otherwise -0 as a string
		//just turns into 0 which will become the same as 0 
		else if (typeof value == "string" && value.trim() != "" && typeof v == "number" && !Object.is(-0,v) && value == v) {
			
				matchedArr.push(v);
			
		  }else if (typeof value == "number" && !Object.is(value,-0) && !Object.is(value,NaN) && !Object.is(value,Infinity) && !Object.is(value,-Infinity) && typeof v == "string" && v.trim() != "" && value == v) {
				matchedArr.push(v);
		  }
	}
	
	
	return matchedArr
}


// tests:
var myObj = { a: 2 };

var values = [
	null, undefined, -0, 0, 13, 42, NaN, -Infinity, Infinity,
	"", "0", "42", "42hello", "true", "NaN", true, false, myObj
];

console.log(setsMatch(findAll(null,values),[null,undefined]) === true);
console.log(setsMatch(findAll(undefined,values),[null,undefined]) === true);
console.log(setsMatch(findAll(0,values),[0,"0"]) === true);
console.log(setsMatch(findAll(-0,values),[-0]) === true);
console.log(setsMatch(findAll(13,values),[13]) === true);
console.log(setsMatch(findAll(42,values),[42,"42"]) === true);
console.log(setsMatch(findAll(NaN,values),[NaN]) === true);
console.log(setsMatch(findAll(-Infinity,values),[-Infinity]) === true);
console.log(setsMatch(findAll(Infinity,values),[Infinity]) === true);
console.log(setsMatch(findAll("",values),[""]) === true);
console.log(setsMatch(findAll("0",values),[0,"0"]) === true);
console.log(setsMatch(findAll("42",values),[42,"42"]) === true);
console.log(setsMatch(findAll("42hello",values),["42hello"]) === true);
console.log(setsMatch(findAll("true",values),["true"]) === true);
console.log(setsMatch(findAll(true,values),[true]) === true);
console.log(setsMatch(findAll(false,values),[false]) === true);
console.log(setsMatch(findAll(myObj,values),[myObj]) === true);

console.log(setsMatch(findAll(null,values),[null,0]) === false);
console.log(setsMatch(findAll(undefined,values),[NaN,0]) === false);
console.log(setsMatch(findAll(0,values),[0,-0]) === false);
console.log(setsMatch(findAll(42,values),[42,"42hello"]) === false);
console.log(setsMatch(findAll(25,values),[25]) === false);
console.log(setsMatch(findAll(Infinity,values),[Infinity,-Infinity]) === false);
console.log(setsMatch(findAll("",values),["",0]) === false);
console.log(setsMatch(findAll("false",values),[false]) === false);
console.log(setsMatch(findAll(true,values),[true,"true"]) === false);
console.log(setsMatch(findAll(true,values),[true,1]) === false);
console.log(setsMatch(findAll(false,values),[false,0]) === false);

// ***************************

function setsMatch(arr1,arr2) {
	if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length == arr2.length) {
		for (let v of arr1) {
			if (!arr2.includes(v)) return false;
		}
		return true;
	}
	return false;
}
