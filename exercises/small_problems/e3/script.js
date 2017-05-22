// Build a program that randomly generates and logs Teddy's age to the console. Have the age be a random number between 20 and 200 (inclusive).


function age(min, max) {
	console.log('Teddy is ' + (Math.floor(Math.random() * (max - min + 1)) + min) + ' years old!');

}

// write a function that asks your age and when you would like to retire. It should log the current year and the year in which you'll retire
// plus how many years are left

function retire() {
	var age = parseInt(prompt('How old are you?'));
	var retire = parseInt(prompt('What age will you retire?'), 10);

	var date = new Date();
	var year = date.getFullYear();
	var left = retire - age;
	var retireYear = date + year;

	console.log('It is ' + date + ', and you will retire in ' + retireYear + '. You have ' + left + ' years to go');
}

retire();


// write a function  that returns true if the string arg that is passed in is palindromic, it is case sensitive

function isPalindrome(string) {
	if (string.length === 1) {
		return true;
	}

	return string === string.split("").reverse().join("");
}

isPalindrome('madam i\'m adam');
isPalindrome('356653'); 

// Write a function that returns true if its integer argument is palindromic, false otherwise.
// A palindromic number reads the same forwards and backwards.

function isPalindromicNumber(number) {
  return isPalindrome(String(number));
}

isPalindromicNumber(34543);        // true
isPalindromicNumber(123210);       // false

// write a function  that takes an array of numbers, and returns an array with the same number of elements with 
// each elements value being running total from the original array.

function runningTotal(array) {
  var result = 0;

  return array.map(function(item) {
    result += item;
    return result;
  });
}

// Given a string of words separated by spaces, write a function that swaps the first and last letters of every word.

function swap(string) {
	var array = string.split(" ");
	return array.map(function(word) {
		return swapChars(word);
	}).join("");
}

function swapChars(word) {
	return word[word.length - 1] + word.slice(1, -1) + word[0]
}


// write a function that returns an object, showing the number of words with different lengths, the function is then modified to remove non
// characters form the returned object result

function wordSizes(string) {
	var newString = string.replace(/[^a-z]/ig, '');
	return newString.split(" ").reduce(function(acc, word) {
		acc[word.length] = (acc[word.length] || 0);
		acc[word.length] += 1;
		return acc;
    }, {});
}
