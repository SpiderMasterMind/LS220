//The intention of the program below is to output a paragraph. Copy and paste the program into a JavaScript console 
//(i.e from the Chrome Developer Tools). Run the program. Is the output what you expected? Are there bugs/errors

//var paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed \
//ligula at risus vulputate faucibus. Aliquam venenatis nibh ut justo dignissim \
//dignissim. Proin dictum purus mollis diam auctor sollicitudin. Ut in bibendum \
//ligula. Suspendisse quam ante, dictum aliquam tristique id, porttitor pulvinar \
//diam. Maecenas blandit aliquet ipsum. Integer vitae sapien sed nulla rutrum \
//hendrerit ac a urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.';

// contains white space after / and between lines, therefore corrected to:
var paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed \
ligula at risus vulputate faucibus. Aliquam venenatis nibh ut justo dignissim \
dignissim. Proin dictum purus mollis diam auctor sollicitudin. Ut in bibendum \
ligula. Suspendisse quam ante, dictum aliquam tristique id, porttitor pulvinar \
diam. Maecenas blandit aliquet ipsum. Integer vitae sapien sed nulla rutrum \
hendrerit ac a urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.';

console.log(paragraph);

// what do we log at the console.log statements?
var myBoolean = true;
var myString = 'hello';
var myArray = [];
var myOtherString = '';

if (myBoolean) {
  console.log('Hello'); // 'Hello' as myBoolean is truthy
}

if (!myString) {
  console.log('World'); // ! operator inverts truthy/falsey, so no log
}

if (!!myArray) {
  console.log('World'); // !! converts to boolean to 'World'
}

if (myOtherString || myArray) {
  console.log('!'); // '!' because myOtherString is truthy, myArray not evaluated
}

// only false, null, NaN, undefined, 0 and '' are falsey
var condition1,condition2,condition3,condition4,condition5;
if (condition1) {
  // some code
  if (condition2) {
    // some code
  } else {
    // some code
  }
} else {
  // some code
  if (condition4) {
    // some code
    if (condition5) {
    // some code
    }
  }
}

// there are 5 possible paths in the above code

var name = 'Bob';
var saveName = name;
name = 'Alice'
console.log(name, saveName); // saveName is assigned a reference to the name var: 'Bob', name is then re assigned to Alice
// returns 'Alice', 'Bob'

var name = 'Bob';
var saveName = name;
name.toUpperCase();
console.log(name, saveName); // name.toUpperCase() only returns BOB, strings are immutable so name remains as 'Bob'

// write a program that asks a user for a phrase and returns teh number of characters:
var phrase = prompt("Please enter a phrase");
alert("That had " + phrase.replace(/\W/, "").split("").length + " characters");

// convert a string to an integer:

function stringToInteger(string) {
  
	var result = 0;
  var numbers = stringToNumbers(string);
  for (var i = 0; i < numbers.length; i++) {
    result = 10 * result + numbers[i];
  }

  return result;
}

function stringToNumbers(string) {
	var digits = {
		'0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
		'5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	}
  var result = [];
  for (var i = 0; i < string.length; i++) {
    result.push(digits[string[i]]);
  }

  return result;
}

console.log(stringToInteger('4321'));
console.log(stringToInteger('570'));

function stringToSignedInteger(string) {
	if ((string[0] !== "-") || (string[0] !== "+")) {
		return stringToInteger(string);
	}
	if (string[0] === "+") {
		return stringToInteger(string.slice(1));
	}
	return -stringToInteger(string.slice(1));
}

stringToSignedInteger('4321');
stringToSignedInteger('-570');
stringToSignedInteger('+100');

