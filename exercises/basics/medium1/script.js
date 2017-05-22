(false && undefined); // false as both are falsey
(false || undefined); // undefined
((false || undefined) || (false && undefined)); //  undefined
((false && undefined) && (false || undefined)); // false
((false || undefined) && (false && undefined)); // false
('a' || (false && undefined) || ''); // undefined
((false && undefined) || 'a' || ''); // 'a'
('a' && (false || undefined) && '');// 'a'
((false || undefined) && 'a' && ''); // undefined

// conditional loop, should return  multiples of 3 from 0 to 9
var i = 0;
while (i < 10) {
  if (i % 3 === 0) {
    console.log(i);
		i += 1; // this line required otherwise i will never increment after i === 3, and an infinite loop occurs
  } else {
    i += 1;
  }
}

// This code should llog a multiplication table for numbers 1 to 10 to the console

var row;
var i;
var j;

function padLeft(num) {
  return String(num).length <= 1 ? ' ' + num : num;
}

for (i = 1; i <= 10; i++) { //     < becomes <=, this meant that the code only ran multiplicative numbers up to 9
  row = '';
  for (j = 1; j <= 10; j++) {
    row += padLeft(i * j) + ' ';
  }
  console.log(row + '\n');
}


// The problem with this code was that length was re assigned in the second loop.  Not a fan of setting that many vars in a for loop parameter anyway
function getSelectedColumns(numbers, cols) {
  var result = [];
  for (var i = 0, length = numbers.length; i < length; i++) {
    for (var j = 0; j < cols.length; j++) {
      if (!result[j]) {
        result[j] = [];
      }

      result[j][i] = numbers[i][cols[j]];
    }
  }

  return result;
}

getSelectedColumns(array1, [0]);     // [[1]]; expected [[1, 4, 7]]
getSelectedColumns(array1, [0, 2]);  // [[1, 4], [3, 6]]; expected [[1, 4, 7], [3, 6, 9]]
getSelectedColumns(array2, [1, 2]);  // [[2, 2], [3, 4]]; expected [[2, 2, 2], [3, 3, 3]]


// THis prints 'debugging' as the inner function has access to status by lexical scoping rules
function debugIt() {
  var status = 'debugging';
  function logger() {
    console.log(status);
  }

  logger();
}

debugIt();

// This function needs to take any number of arguments
function invoice() {
	var result = 0;
	for (var i = 0; i < arguments.length; i+= 1) {
		result += arguments[i];
	}
}

// In this code we add a return keyword, and define sum as an integer variable otherwise it returns undefined and does not work:

function productOfSums(array1, array2) {
  var result;
  result = total(array1) * total(array2);
  return result;
}

function total(numbers) {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum;
}
