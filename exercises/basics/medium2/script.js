// Process order functions, 0 is falsey which leads to unexpected results.
function processOrder(price, quantity, discount, serviceCharge, tax) {
  quantity = quantity || 1;
  discount = discount || 0;
  serviceCharge = serviceCharge || 0.1;
  tax = tax || 0.15;
  return (price * quantity) * (1 - discount) * (1 + serviceCharge) * (1 + tax);
}

//

var person = {name: 'Victor'};
var otherPerson = {name: 'Victor'};

console.log(person === otherPerson); // returns false because each var holds a reference to different objects (even though their contents are the same)

//instead we must:

var otherPerson = person;

var startingBalance = 1;
var chicken = 5;
var chickenQuantity = 7;

var totalPayable = function(item, quantity) {
	return startingBalance + (item * quantity);
}

startingBalance = 5;
console.log(totalPayable(chicken, chickenQuantity));

startingBalance = 10;
console.log(totalPayable(chicken, chickenQuantity));

// due to a closure being created, the function totalPayable looks up teh values of the variables, 40 and 45 are returned.

// doubler function defined below:

function doubler(number, caller) {
  console.log('This function was called by ' + caller + '.');
  return number + number;
}

doubler(5, 'Victor');       // 10
// This function was called by Victor.

function makeDoubler(caller) {
	return function(number) {
		console.log('This was called by ' + caller)
		return number + number
	};
}

var doubler = makeDoubler('Victor')
doubler(5) // 10 here the caller variable can still be accessed by teh return function, because it creates a closure

var arr = ['Apples', 'Peaches', 'Grapes'];
arr[3.4] = 'Oranges'
arr[-2] = 'Watermelon'

// arr is now 
['Apples', 'Peaches', 'Grapes', '3.4' : 'Oranges', '-2' : 'Watermelon'];
Object.keys(arr) // returns ['0', '1', '2', '3.4', '-2']


var languages = ['JavaScript', 'Ruby', 'Python'];
console.log(languages);
console.log(languages.length); // 3

languages.length = 4;
console.log(languages);
console.log(languages.length); // 4

languages.length = 1;
console.log(languages);
console.log(languages.length); // 1

languages.length = 3;
console.log(languages);
console.log(languages.length); // 3

languages.length = 1;
languages[2] = 'Python';
console.log(languages);
console.log(languages[1]);
console.log(languages.length);  // 4

// the length property can be redefined. Setting length to a value less, shortens teh array, setting it higher adds undefined elements, which are then retained


function one() {
  function log(result) {
    console.log(result);
  }

  function anotherOne() {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
      result += String.fromCharCode(arguments[i]);
    }

    log(result);
  }

  function anotherAnotherOne() {
    console.log(String.fromCharCode(87, 101, 108, 99, 111, 109, 101, 32));
    anotherOne(116, 111, 32);
  }

  anotherAnotherOne();
  anotherOne(116, 104, 101, 32);
  return anotherOne;
}

one()(77, 97, 116, 114, 105, 120, 33);
// returns Welcome to the Matrix!
