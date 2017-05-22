// write a function that takes a string argument.  If any chars are repeated consecutively, collapse these into 1 char

function crunch(string) {
  return string.replace(/(.)\1*/g, '$1');
}	

crunch('ddaaiillyy ddoouubbllee');        // 'daily double'
crunch('4444abcabccba');                  // '4abcabcba'
crunch('ggggggggggggggg');                // 'g'
crunch('a');                              // 'a'
crunch('');                               // ''

// write a function that will take a string and return a bannerized string:

function bannerize(string) {
	var len = string.length;
	var result = [];
	result.push('+-');
	result.push('-'.repeat(len));
	result.push('-+\n');
	result.push('| ');
	result.push(' '.repeat(len));
	result.push(' |\n');
	result.push('| ');
	result.push(string);
	result.push(' |\n');
	result.push('| ');
	result.push(' '.repeat(len));
	result.push(' |\n');
	result.push('+-');
	result.push('-'.repeat(len));
	result.push('-+\n');
	console.log(result.join(''));
}

bannerize('To boldly go where no one has gone before.');


// write a function that takes a positive integer argument, and returns that number of alternating 1s and 0s:

function stringy(number) {
  var string = '';
  for (var i = 0; i < number; i++) {
    string += ((i + 1) % 2).toString(); 
  }
  return string;
}

stringy(6) // '101010'
stringy(9) // '101010101'
stringy(4) // '1010'
console.log(stringy(7)); // '1010101'

//Write a function that calculates and returns the index of the first Fibonacci number that 
//has the number of digits specified as an argument. (The first Fibonacci number has index 1.)

function findFibonacciIndexByLength(int) {
	var fibSeries = [1, 1, 2];
	if (int === 1) {
		return 0;
	}

	while (String(fibSeries[fibSeries.length - 1]).split('').length !== int) {
		var fibNum = fibSeries[fibSeries.length - 1] + fibSeries[fibSeries.length - 2]
		fibSeries.push(fibNum);		
	}
	return fibSeries.length;
}

findFibonacciIndexByLength(2);     // 7
findFibonacciIndexByLength(10);    // 45
findFibonacciIndexByLength(16);    // 74

// write a function that takes one positive integer argument, and logs a triangle whose bottom and right sides have int stars
function triangle(int) {
  for(var i = 1; i < int; i += 1) {
    console.log(' '.repeat(int - i) + "*".repeat(i));
  }

  console.log("*".repeat(int))
}

// Create a simple madlib program that prompts for a noun, a verb, an adverb,
//and an adjective and injects those into a story that you create.var noun = prompt('noun:');
var verb = prompt('verb:');
var adjective = prompt('adjective:');
var adverb = prompt('adverb:');
var noun = prompt('noun');

console.log('Do you ' + verb + ' your ' + noun + ' ' + adverb + '? That is ' + adjective);

// write a 'double number' function.  This should return twice the number, unless its left side digits are the same as its right side digits in which
//case just return it

function twice(int) {
  var numString = int.toString();
  var halfLength = int.length / 2
  var leftmost = int.substr(0, halfLength);
  var rightmost = int.substr(halfLength);

  return (leftmost === rightmost ? int : int * 2);
}


function getGrade(grade1, grade2, grade3) {
  var average = (grade1 + grade2 + grade3) / 3;

  if (average >= 90) {
    return 'A';
  } else if (average >= 80) {
    return 'B';
  } else if (average >= 70) {
    return 'C';
  } else if (average >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

// write a function that removes all non alphabetic characters with spaces

function cleanUp(string) {
  return string.replace(/\W+/g, ' ');
}

cleanUp('---what\'s my +*& line?');      // ' what s my line '

// write a function that takes an integer argument and returns the correct century naming

function century(year) {
  var century =  Math.ceil(year / 100);
  if ([11, 12, 13].indexOf(century % 100) !== -1) return century + 'th';

  var remainder = century % 10;
  return century + getSuffix(remainder);
}

function getSuffix(remainder) {
  switch (remainder) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

century(2000);        // '20th'
century(2001);        // '21st'
century(1965);        // '20th'
century(256);         // '3rd'
century(5);           // '1st'
century(10103);       // '102nd'
century(1052);        // '11th'
century(1127);        // '12th'
century(11201);       // '113th'
