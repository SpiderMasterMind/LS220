var myArray = [1, 2, 3, 4];
var myOtherArray = myArray;

myArray.pop();
console.log(myOtherArray); // prints [1,2,3] as both vars reference the same location is memory

myArray = [1, 2];
console.log(myOtherArray); // prints [1,2,3] as the new assignment doesnt change the aforementioned array


function concat(array1, array2 ) {
  var newArray = []
  for (var i = 0, length = array1.length; i < length; i+= 1) {
    newArray[i] = array1[i];
  }

  if (Array.isArray(array2)) {
    for (var i = 0, length = array2.length; i < length; i+=1) {
      newArray[newArray.length] = array2[i];
    }
  } else {
    newArray[newArray.length] = array2;
  }
  return newArray;
}

concat([1, 2, 3], [4, 5, 6]);            // [1, 2, 3, 4, 5, 6]
concat([1, 2], 3);                       // [1, 2, 3]
concat([2, 3], ['two', 'three']);        // [2, 3, "two", "three"]
concat([2, 3], 'four');                  // [2, 3, "four"]


var obj = { a: 2, b: 3 };
var newArray = concat([2, 3], obj);      // [2, 3, { a: 2, b: 3 }]
obj.a = 'two';
newArray;                                // [2, 3, { a: 'two', b: 3 }]

var arr1 = [1, 2, 3];
var arr2 = [4, 5, obj];
var arr3 = concat(arr1, arr2);
arr3;                                    // [1, 2, 3, 4, 5, { a: 'two', b: 3 }]
obj.b = 'three';
arr3;                                    // [1, 2, 3, 4, 5, { a: 'two', b: 'three' }]

arr3[5].b = 3;                           // or arr3[5]['b'] = 3
obj; 


function myPop(array) {
	var result = array[array.length - 1];
	array.splice(array.length - 1);
	return result;
}

function myPush(array) {
	for (var i = 1; i < arguments.length - 1; i += 1) {
		array[array.length] = arguments[i];

		return array.length // push always returns the length!
	}
}

var array = [1, 2, 3];
pop(array);                   // 3
console.log(array);           // [1, 2]
pop([]);                      // undefined
pop([1, 2, ['a', 'b', 'c']]); // [ 'a', 'b', 'c' ]

var array = [1, 2, 3];
push(array, 4, 5, 6);         // 6
console.log(array);           // [1, 2, 3, 4, 5, 6]
push([1, 2], ['a', 'b']);     // 3
push([], 1);                  // 1
push([]);

// my reverse:

function reverse(array) {
	var result = [];
	for (var i = 0; i < array.length; i++ ) {
		result.unshift(array[i]);
    }
	return result;
}

// myShift

function myShift(array) {
	if (array.length > 0) {
		return array.splice(0, 1).pop();
    }
    return result;
}

// my my own unshift

function myUnshift(array) {
  for (var i = 1; i < arguments.length; i += 1) {
    array.splice(i - 1, 0, arguments[i]);
  }

  return array.length;
}

// given this function, explain why the below equality operators return false

function oddities(array) {
  var oddElements = [];
  for (var i = 0; i < array.length; i += 2) {
    oddElements.push(array[i]);
  }
  return oddElements;
}

oddities([2, 3, 4, 5, 6]) === [2, 4, 6]   // false
oddities(['abc', 'def']) === ['def']      // false
// The Array objects are referenced in different places in memory so the above comparisons will never return true

// checks if contents of two arrays are equal
function areArraysEqual(array1, array2) {
	array1.sort();
	array2.sort();

	for (var i = 0; i < array1.length; i += 1) {
		if (array1[i] !== array2[i]) {
			return false;
		}
	}

	return true;
}
