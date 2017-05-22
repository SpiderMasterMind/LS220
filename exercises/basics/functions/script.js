var myVar = 'This is global';

function someFunction() {
  var myVar = 'This is local';
}

someFunction();

console.log(myVar);  // prints 'This is global' because myVar was defined at global scope (lexical scoping rule)
//

var myVar = 'This is global';

function someFunction() {
  var myVar = 'This is local';
  console.log(myVar); // prints 'This is local' as the myVar function is found at the local scope first of all
}

someFunction();

//

var myVar = 'This is global';

function someFunction() {
  myVar = 'This is local';
}

someFunction();

console.log(myVar); // prints 'This is local' because the function body points to the global myVar, accessible from inner scope


var myVar = 'This is global';

function someFunction() {
  console.log(myVar);
}

someFunction(); // prints 'This is global', myVar is found in teh global scope

function someFunction() {
  myVar = 'This is global';
}

someFunction();
console.log(myVar);  //  prints 'This is global' , myVar assigned as a global 

var a = 7;

function myValue(b) {
  b += 10;
}

myValue(a);
console.log(a); // JS is pass by value here, global var a is not changed by invocation of myValue


var a = 7;

function myValue(a) {
  a += 10;
}

myValue(a);
console.log(a);  //  var a in the function body is local only to the function, a globally, remains at 7;


var a = [1, 2, 3];

function myValue(b) {
  b[2] += 7;
}

myValue(a);
console.log(a);  // objects are mutable, this time the value of a is passed to the function, and [1, 2, 10] is printed

////

console.log(a);

var a = 1; // undefined is returned because JS hoists var a; to the top of the code
