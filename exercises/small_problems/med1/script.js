// Write a function that rotates an array by moving the first element to the end of the array. Do not modify the original array.
// If the input is not an array return undefined
// If the input is an empty array, return an empty array

function rotateArray(arr) {
	if (Array.isArray(arr) !== true) {
		return undefined;
	} else if (arr.length === 0) {
		return [];
	}

	var result = arr;
	var first = arr.shift();
	result.push(first);
	return result;
}

// Write a function that can rotate the last n digits of a number. For the rotation, rotate 1 digit to the left and put the first digit to the right.

function rotateRightmost(input, numToRotate) {
	var rightmost = (input).toString();
	var leftmost = rightmost.slice(0, rightmost.length - numToRotate);
	rightmost = rightmost.slice((rightmost.length) - (numToRotate), rightmost.length);

	rightmost = rotateArray(rightmost.split("")).join("");
	return Number(leftmost + rightmost);
}

// write a function that returns the maximum rotation of the argument

function maxRotation(integer) {
  for (var i = integer.toString().length; i > 1; i--) {
    result = rotateRightmostDigits(result, i);
  }

  return result;
}


// minilang program:

function minilang(command) {
	var value = 0;
	var collection = [];
	command.split(" ").forEach(function(op) {
		switch (op) {
			case 'ADD':
				value += collection.pop();
				break;
			case 'DIV':
				value = parseInt(value / collection.pop(), 10);
				break;
			case 'DIV':
				value = parseInt(value % collection.pop(), 10);
				break;
			case 'MULT':
				value *= collection.pop();
				break;
			case 'SUB':
				value -= collection.pop();
				break;
			case 'PUSH':
				collection.push(value);
				break;
			case 'POP':
				value = collection.pop();
				break;
			case 'PRINT':
				console.log(value);
				break;
			default:
				value = parseInt(op, 10);
			}	
	});
}

// write a function that takes a sentence string input and converts word-numbers to digits


function wordToDigit(string) {
	var wordArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	return string.split(" ").map(function(word) {
		if (wordArray.indexOf(word) === -1) {
			return word;
		} else {
			return wordArray.indexOf(word) + 1;
		}
	}).join(" ");
}


// Write a recursive function that computes the nth Fibonacci number, where nth is an argument to the function.

function fibonacci(n) {
	if (n <= 2) {
		return 1;
	} else {
		return fibonacci(n - 1) + fibonacci(n - 2);
	}
}


// re write the fibonacci function without recursion

function fibonacciAgain(n) {
	var series = [1, 1];
	while (series.length < n) {
		var newFibNumber = series[series.length - 1] + series[series.length - 2];
		series.push(newFibNumber);
		console.log(series);
	}

	return series[series.length - 1];
}


// refactored recursive fibonacci with memoization

var memo = {};
function fibonacci(nth) {
  if (nth <= 2) {
    return 1;
  } else {
    if (memo[nth]) {
      return memo[nth]
    } else {
      memo[nth] = fibonacci(nth - 1) + fibonacci(nth - 2);
      return memo[nth];
    }
  }
}
