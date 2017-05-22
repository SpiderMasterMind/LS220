// write a function that takes a string argument, and returns the percentage number of lowercase, uppercase or neither instances of chars in object form
// there will always be at least one character
function letterPercentages(string) {
	var percentagePerChar = 0;
	var result = string.split("").reduce(function(obj, char) {
		if (char.match(/[a-z]/)) {
			obj['lowercase'] = (obj['lowercase'] || 0) + 1;
		} else if (char.match(/[A-Z]/)) {
			obj['uppercase'] = (obj['uppercase'] || 0) + 1;
		} else {
			obj['neither'] = (obj['neither'] || 0) + 1;
		}
		return obj;
	}, {});
		
	for (category in result) {
		percentagePerChar += result[category];
	}

	for (category in result) {
		result[category] = (result[category] * (100 / percentagePerChar)).toFixed(2);
	}
	return result;
}

// Given the rules for triangle types, write a function that takes three num arguments, and returns the correct type:
// equilateral: all sides the same length, isosceles: 2 sides equal length, scalene: 3 sides different lengths, valid: all sides greater than
// 0, two short sides longer than the single longest side.

function triangle(arg1, arg2, arg3) {
  var sides = [arg1, arg2, arg3];

  if (arg1 === 0 || arg2 === 0 || arg3 === 0) {
    return 'invalid'
  }

  sides = sides.sort();

  if (sides[0] + sides[1] < sides[2]) {
    return 'invalid'
  }

  if (sides[0] === sides[2]) {
    return 'Equilateral'
  } else if (sides[0] === sides[1] || sides[1] === sides[2]) {
    return 'Isosceles'
  } else {
    return 'Scalene'
  }
}

// write a function that will return the number of Friday teh 13ths in the year passed in as an argument.  Starting from the year 1752

function fridayThe13ths(year) {
	var result = 0;
	var date;

	for (var i = 0; i < 12; i += 1) {
		date = new Date(year, i, 13);
		if (date.getDay() === 5) {
			count += 1;
		}
	}
}


// a featured number is an odd number that is a multiple of 7, whose digits occur exactly once each.
// Write a function that takes an integer argument, and returns the next featured number greater than this

// write a function that finds the difference between the sum of the first positive integers to n, and the sum of their squares

function sumSquareDifference(n) {
  var sum = 0;
  var sumOfSquares = 0;

  for (var i = 1; i <= n; i++) {
    sum += i;
    sumOfSquares += Math.pow(i, 2);
  }

  return Math.pow(sum, 2) - sumOfSquares;
}

// Bubble sort

function bubbleSort(a) {
  var swapped;
  do {
    swapped = false;
    for (var i = 0; i < a.length - 1; i += 1) {
      if (a[i] > a[i + 1]) {
        var temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}
