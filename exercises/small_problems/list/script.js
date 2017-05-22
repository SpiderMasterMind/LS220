// sort an array of numbers in order of their name equivalents
// return the sorted array
// using an incremental string array from zero: [zero, one, two, three, four, five, six, seven, eight]..
// convert the array into the string array - use map
// perform a standard alphabet sort
// convert back into numbers

var myArray = [4, 68, 3, 1, 78];
var arrayToAlphabetise = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

function sortNumbers(numbersArray) {
  return numbersArray.sort(function(num1, num2) {
    console.log(num1, num2, num1 - num2)
    return num1 - num2;
  });
}

console.log(sortNumbers(myArray));


function alphabetise(numbersArray) {
  var namedNumbersArray = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve',
                           'thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

  return numbersArray.map(function(element) {
    return namedNumbersArray[element];      // returns new array of string equivalents
  }).sort().map(function(stringElement) {   // sort() rearranges array alphabetically
    return namedNumbersArray.indexOf(stringElement);  // converts back to integers using index in nameNumbersArray
  });
}

console.log(alphabetise(arrayToAlphabetise));

// write a function that takes one argument, an integer, and returns sum of the digits
// input: one argument, test cases:

// is there a limit to max number of digits?
// what about bad input?
//sumOfDigits(NaN);
//sumOfDigits(nil);
//sumOfDigits('string');
// More than one argument?
//sumOfDigits(100, 111);
// is an integer so we dont need to worry about fractions etc
// Output is an integer

// convert argument to string, split into array: ['1', '0', '0']
// convert to array of integers - use map or for loop, and use Array.reduce to find total 
// - two args for reduce - accumulator is 0, sum is 0 to start
function sumOfDigits(int) {
  var intArray = String(int).split('').map(function(element) {
    return parseInt(element, 10);
  });

  return intArray.reduce(function(sum, total) {
    return sum + total;
  });
}
console.log(sumOfDigits(65535));
sumOfDigits(4554);
sumOfDigits(111);

// THis function should take two array arguments containing all numbers
// it should return one array that contains the product of every pair
// of numbers between the arrays, the result should also be sorted

// nested loop or map
// nested loop and resulting array
function multiplyAllPairs(arr1, arr2) {
  var result = [];
  var newValue;
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      newValue = (arr1[i] * arr2[j]);
      result.push(newValue);
    }
  }
  console.log(result);
  newArr = result.sort(function(num1, num2) {
    return num1 - num2;
  });
  console.log(newArr);
}

multiplyAllPairs([2, 4], [4, 3, 1, 2]);

// write a function that takes an array of numbers  and then returns the sum  of the sums of each leading subsequence for that array
function sumOfSums(arr) {
  return arr.map(function(number, index) {
    return arr.slice(0, index + 1).reduce(function(sum, value) {
      return sum + value;
    });
  }).reduce(function(sum, value) {
    return sum + value;
  });
}

console.log(sumOfSums([3, 5, 2]));       // (3) + (3 + 5) + (3 + 5 + 2) # -> (21)
console.log(sumOfSums([1, 5, 7, 3]));

// Write a method that returns a list of all substrings of a string.  The returned list should be ordered by where in the string
// the substring begins.  This means al substrings at position 0 should come first.  The position 1 and so on.  Since multiple
// substrings will occur in each position, the substrings at a given position should occur from shortes to longest.

// Example input ('abcde')
var test = [ 'a', 'ab', 'abc', 'abcd', 'abcde',
             'b', 'bc', 'bcd', 'bcde',
             'c', 'cd', 'cde',
             'd', 'de',
             'e'];

// A substring is a smaller part of the original input string
// Any combination of chars in the input string could be used, even spaces
// Potentially integers could be used or mixed in, would need to use toString, and parseInt, probably not needed

// Input - is a single string.  What to do with an empty string/nil? Just return it
// Output - is a single array, with a fixed number of computable elements.  Should I output to console or just return?
// Edge cases - Any char should be acceptable, as we will process each char in the same way, using its position, regardless of what it is
substrings('ben s');
substrings('abcde');
substrings('');
// substrings(nil);
substrings('Z');

// Data structure, input and output types are defined, so we only need to worry about this if intermediate variable steps are needed
// Algorithm wise, the size/length of the output is string.length + (string.length -1) + (string length -2) etc
// so for a three char string its 3 + 2 + 1 = 6
// a eight char string is 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36
// Algorithm in JS terms

// First 'line' is result.push(string[0]), result.push(string[0], string[1]), etc while [i] < string.length
// second line is result.push(string[1]), result.push(string[1], string[2]), etc
// Number of lines is === string length
//seems too complicated
// use for loop and string.substring(0,1), substring(0,2) etc until substring(0, string.length)
// for outer loop the first number is a counter from 0 to string.length, the second is the first + 1

function substrings(string) {
  var result = [];

  for (var j = 0; j <= string.length; j++) {
    for (var i = j + 1; i <= string.length; i++) {
      result.push(string.substring(j, i));
    }
  }
  console.log(result);
}

// the function should return a list of substrings in a string that
// are pallindromic
// include duplicates
// arrange them in teh order they were found
function palindromes(string) {
  return substrings(string).filter(function(substring) {
    return isPalindrome(substring);
  });
}

function isPalindrome(word) {
  return word.length > 1 && word === word.split('').reverse().join('');
}


function substrings(string) { //  returns substrings
  var result = [];

  for (var j = 0; j <= string.length; j++) {
    for (var i = j + 1; i <= string.length; i++) {
      result.push(string.substring(j, i));
    }
  }
  return result;
}

substrings('madam');


buyFruit([['apples', 3], ['orange', 1], ['bananas', 2]]);

function buyFruit(arr) {
  var result = [];
  arr.forEach(function(item) {
    for (var i = 1; i <= item[1]; i++) {
      result.push(item[0]);
    }
  });
  return result;
}


// write a function that returns the transactions for those specified, in an array of objects

var transactions = [ {id: 101, movement: 'in', quantity: 5, },
                     {id: 105, movement: 'in', quantity: 10, },
                     {id: 102, movement: 'out', quantity: 17, },
                     {id: 101, movement: 'in', quantity: 12, },
                     {id: 103, movement: 'out', quantity: 15, },
                     {id: 102, movement: 'out', quantity: 15, },
                     {id: 105, movement: 'in', quantity: 25, },
                     {id: 101, movement: 'out', quantity: 18, },
                     {id: 102, movement: 'in', quantity: 22, },
                     {id: 103, movement: 'out', quantity: 15, },];

transactionsFor(101, transactions);
// result
test = [ { id: 101, movement: 'in', quantity: 5 },
  { id: 101, movement: 'in', quantity: 12 },
  { id: 101, movement: 'out', quantity: 18 }, ]

function transactionsFor(inventoryItem, transactions) {
  return transactions.filter(function(obj) {
    return obj.id === inventoryItem;
  });
}

function isItemAvailable(inventoryItem, transactions) {
  var count = 0;
  transactionsFor(inventoryItem, transactions).forEach(function(obj) {
    if (obj.movement === 'in') {
      count += obj.quantity;
    } else if (obj.movement === 'out') {
      count -= obj.quantity;
    }
  });
  
  if (count > 0) {
    return true;
  }

  return false;
}

isItemAvailable(101, transactions); // false
isItemAvailable(105, transactions); // true
