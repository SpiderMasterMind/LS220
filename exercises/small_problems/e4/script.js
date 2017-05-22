// write a function that represents an angle between 0 and 360 degrees and returns a String that represents that angle in degreesm minutes
// and seconds.  There are 60 minutes in a degree, and 60 seconds in a minute

function dms(float) {
	var deg;
	var min;
	var sec;
	if (float < 1) {
		deg = 0;
  } else {
		deg = Math.floor(float);
  }

	min = ((float % 1) * 0.6);
	sec = (((min % 1) * 0.6).toFixed(2)) * 100;
	
	min = (min.toFixed(2)) * 100;
	console.log(deg, min, sec);
	return deg + "˚" + min + "'" + sec + "\"";
}


// write a union function that combines two arrays of equal lengths.  There should be no duplicates in teh resultant array

function union(arr1, arr2) {
	var result = [];  
	for (var i = 0; i < arr1.length; i += 1) {
    result.push(arr1[i], arr2[i]);
  }

	return result.filter(function(item, idx) {
    return result.indexOf(item) == idx;
	});
}

//Write a function that takes an Array as an argument, and returns an array that contains 2 elements, each of which is an Array. 
//Put the first half of the original Array elements in the first element of the return value, and put the second half in the second element. 
//:w!If the original array contains an odd number of elements, place the middle element in the first half Array.

function halvsies(arr) {
  var halfArray = Math.ceil(arr.length / 2);
  var firstHalf = array.slice(0, halfArray);
  var secondHalf = array.slice(halfArray);

  return [firstHalf, secondHalf];
}

// Given an unordered array and the information that exactly one value in the array occurs twice (every other value occurs exactly once), determine which value occurs twice? Write a function that will find and return the duplicate value that is in the array.

function findDuplicate(arr) {
  var testArray = [];
  var result = [];
  arr.forEach(function(int) {
    if (testArray.includes(int)) {
      result.push(int);
    }

    testArray.push(int);
  })
  return parseInt(result.join(''), 10);
}
findDuplicate([1, 5, 3, 1])                              // 1
findDuplicate([18,  9, 36, 96, 31, 19, 54, 75, 42, 15,
         38, 25, 97, 92, 46, 69, 91, 59, 53, 27,
         14, 61, 90, 81,  8, 63, 95, 99, 30, 65,
         78, 76, 48, 16, 93, 77, 52, 49, 37, 29,
         89, 10, 84,  1, 47, 68, 12, 33, 86, 60,
         41, 44, 83, 35, 94, 73, 98,  3, 64, 82,
         55, 79, 80, 21, 39, 72, 13, 50,  6, 70,
         85, 87, 51, 17, 66, 20, 28, 26,  2, 22,
         40, 23, 71, 62, 73, 32, 43, 24,  4, 56,
         7,  34, 57, 74, 45, 11, 88, 67,  5, 58])  // 73


// write a function that takes two arrays passed as arguments and returns an array that contains all elements from both args, with the elements
// taken in alteration eg:

interleave([1, 2, 3], ['a', 'b', 'c']) // [1, 'a', 2, 'b', 3, 'c']

function interleave(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return undefined;
	}
	var result = [];
	for (var i = 0; i < arr1.length; i += 1) {
		result.push(arr1[i], arr2[i]);
	}
	return result;
}

// write a function that takes an array of integers as an array, adn finds the average of the integers to 3 DPS

function findAverage(arr) {
	var result = arr.reduce(function(acc, int) {
		return acc * int;
	});
	return (result / arr.length).toFixed(3)
}

findAverage([2, 5, 7, 11, 13, 17]) // '28361.667'

// Write a function that takes two Array arguments, in which each Array contains a list of numbers, and returns a new Array that contains the product of each pair of numbers from the arguments that have the same index. 
// You may assume that the arguments contain the same number of elements.

function multiplyList(arr1, arr2) {
	return arr1.map(function(int, idx) {
		return int * arr2[idx];
	});
}

multiplyList([3, 5, 7], [9, 10, 11]) // [27, 50, 77]

// Write a function that takes one argument, a positive integer, and returns a list of the digits in the number.

function digitList(integer) {
	return integer.toString().split("").map(function(el) 	{
		return parseInt(el, 10);
	});
}

// Write a function that counts the number of occurrences of each element in a given array.
//Once counted, log each element alongside the number of occurrences.

function countOccurrences(array) {
  var result = array.reduce(function(acc, word) {
		debugger;
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  Object.keys(result).forEach(function(word) {
    console.log(word + ' => ' + result[word]);
  });
}

// Write a function that takes one argument, an array containing integers, and returns the average of all numbers in the array, 
// rounded downward to the integer component of the average. The array will never be empty and the numbers will always be positive integers.

function average(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i += 1) {
    sum += arr[i];
  }

  return Math.floor(sum / arr.length);
}
