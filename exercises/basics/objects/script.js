var myObject = {
  a: 'name',
  'b': 'test',
  123: 'c',
  1: 'd'
};
myObject[1];
// myObject[a]; This returns a ReferenceError because the vhere must be a string value inside a square bracket.  Instead a is not declared as a variable and canno be coerced
myObject.a;

var person = {
  firstName: function() {
    return 'Victor';
  },
  lastName: function() {
    return 'Reyes';
  },
};

// must use () to obtain result of functions
console.log(person.firstName() + ' ' + person.lastName());


var array1 = ['Moe', 'Larry', 'Curly', 'Chemp', 'Harpo', 'Chico', 'Groucho', 'Zeppo'];
var array2 = [];

for (var i = 0; i < array1.length; i++) {
  array2.push(array1[i]);
}

for (var i = 0; i < array1.length; i++) {
  if (array1[i].startsWith('C')) {
    array1[i] = array1[i].toUpperCase();
  }
}

console.log(array2); // returns ['Moe', 'Larry', 'Curly', 'Chemp', 'Harpo', 'Chico', 'Groucho', 'Zeppo']; because array2 is a copy of array1, they do not reference the same object in memory (objects are mutable)

var myObject = {
  prop1: '123',
  prop2: '234',
  'prop 3': '345',
};

var prop2 = '456';
myObject['prop2'] = '456';
myObject[prop2] = '678';

console.log(myObject[prop2]); // this is the result of reassigning the prop2 property
console.log(myObject.prop2); // this is the result of adding a new property

var myArray = ['a', 'b', 'c'];
console.log(myArray[0]); // prints 'a'
console.log(myArray[-1]); // prints undefined
myArray[-1] = 'd';
myArray['e'] = 5;
myArray[3] = 'f';

console.log(myArray[-1]); // prints 'd'
console.log(myArray['e']); // prints 5
console.log(myArray);  // ['a', 'b', 'c', 'f', '-1' : 'd', e: 5] 

//
var myArray = [5, 5];
myArray[-1] = 5;
myArray[-2] = 5;
function average(array) {
  var sum = 0;
  for (var i = -2; i < array.length; i++) {
    sum += array[i];
  }

  return sum / array.length;  // this returns 10 because negative indices are not counted as part of the array
}

// In this exercise, the arguments functions were missing
function calculateBonus() {
  return arguments[1] ? arguments[0] / 2 : 0;
}

// we can all teh function with something like:
calculateBonus(2000, true); // which will return 3000: amount plus half.  Arguments are still available locally withn the object.
