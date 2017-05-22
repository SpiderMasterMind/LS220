// Log all numbers from 1-99 inclusive, and on separate lines

var n = 1;
while (n < 100) {
	console.log(n + '\n');
	n += 1;
}

// Log all even numbers  from 1 to 99 inclusive, on separate lines

var m = 1
while (m < 100) {
	if (m % 2 === 0) {
		console.log(m);
	}
	
	m += 1;
}

//Build a program that asks a user for the length and width of a room in meters 
//and then logs to the console the area of the room in both square meters and square feet.

//Note: 1 square meter == 10.7639 square feet

//Do not worry about validating the input at this time. Use the prompt() function to collect user input.

var CONVERSION = 10.7639;
var length = Number(prompt('Enter the length of the room in meters:'), 10);
var width = Number(prompt('Enter the width of the room in meters:'), 10);
var area = length * width;
var areaInFeet = area * CONVERSION;


console.log('The area of the room is ' + area.toFixed(2) + ' square meters (' + areaInFeet.toFixed(2) + ' square feet).');


//Create a simple tip calculator. The program should prompt for a bill amount and a tip rate. 
//The program must compute the tip and then log both the tip and the total amount of the bill to the console. You can ignore input validation and assume that the user will put in numbers.

var bill = parseFloat(prompt('Enter the bill amount'), 10);
var tip = parseFloat(prompt('Enter the % to tip'), 10);
console.log('The total is ' + (bill + tip) +  '.');
console.log('The tip is ' + bill * (tip / 100));

// Write a program that asks the user to enter an integer greater than 0, then asks if the user wants to determine the sum or product of all numbers between 1 and the entered integer.


function sum(num) {
  var result = 0;
  for (var i = 1; i <= number; i++) {
    result += i;
  }

  return result;
}

function product(number) {
  var result = 1;
  for (var i = 1; i <= number; i++) {
    result *= i;
  }

  return result;
}

var number = parseInt(prompt('Please enter an integer greater than 0'), 10);
var operation = prompt('"s" to get the sum, "p" to get the product.');

if (operation === 's') {
  var result = sum(number);
  console.log('The sum of the integers between 1 and ' + number + ' is ' + result);
} else if (operation === 'p') {
  var result = product(number);
  console.log('The product of the integers between 1 and ' + number + ' is ' + result);
} else {
  console.log('Oops. Unknown operation.');
}


// write a shortLongShort function that returns a concatenation of the short, long and short strings
function shortLongShort(str1, str2) {
	if (str1.length > str2.length) {
		var long = str1;
		var short = str2;
	} else if (str1.length < str2.length) {
		var long = str2;
		var short = str1;
	}
	console.log(short + long + short);
	return short + long + short;

}
shortLongShort('abc', 'defgh');   // "abcdefghabc"
shortLongShort('abcde', 'fgh');   // "fghabcdefgh"
shortLongShort('', 'xyz');        // "xyz"

