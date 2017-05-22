// Write a function that takes a string, and returns a new string in which it doubles every character.

function doubler(string) {
	return string.split("").map(function(char) {
		return char + char;
	}).join("");
}

doubler('test') // 'tteesstt'

// Doubler part 2: same as above, but only doubles consonants:

function doubleConsonants(string) {
  return string.replace(/([bcdfghjklmnpqrstvwxyz])/gi, '$1$1');
}

// write a function  that takes a positive integer as an argument and returns that number with its digits reversed
function reversedNumber(input) {
	if (typeof(input) !== 'number') {
		return input;
	}

  var result = input.toString().split('').reverse().join('');
	return Number(result);
}


reversedNumber(12345) // 54321
reversedNumber(12213) // 31221
reversedNumber(456)   // 654
console.log(reversedNumber(12000)); // 21 # Note that zeros get dropped!
reversedNumber(1)
console.log(reversedNumber('abc')); // 'abc'

// Write a function that takes a non-empty string argument, and returns the middle character or characters of the argument. 
//If the argument has an odd length, you should return exactly one character. 
//If the argument has an even length, you should return exactly two characters.

function centerOf(string) {
  if (string.length % 2 == 1) {
    return string[Math.floor(string.length / 2)];
  } else {
    return string.substr(string.length / 2 - 1, 2);
  }
}


//  write a function that takes an integer, and always then returns teh negative of that number

function negative(number) {
  return Math.abs(number) * -1;
}

// assuming an integer argument greater than 0, Write a function that takes an integer argument, and returns an Array of all integers, in sequence, between 1 and the argument.

function sequence(integer) {
	var result = [];
	for (var i = 1; i <= integer; i += 1) {
		result.push(i);
	}
	return result;
}

// the function should take a first & second name argument
// then return second, a comma then last

function swapName(name) {
  var result = '';
  var arr = name.split(' ');
  result += arr[1];
  result += ', ';
  result += arr[0];
  return result;
}


// the first arg is the count, the second is the first number in the output sequence
function sequence(count, seq) {
  var result = [];
  if (count === 0) {
    return result;
  }

  for (var i = 1; i <= count; i++) {
    result.push(seq * i);
  }

  return result;
}

// this function whould take a string and return the same string with words in the reverse order.
function reverseSentence(string) {
  string.split(' ').reverse.join('');
}

// this function is like the above, but only reverses those wods with 5 or more characters

function specialReverseSentence(string) {
	return string.split(' ').map(function(word) {
		return word.length < 5 ? word : word.split("").reverse().join("");
	}).join(" ");
}

specialReverseSentence('Launchschool is very good playa')
