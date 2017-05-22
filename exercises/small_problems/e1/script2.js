// write a function that returns true if a year is a leap year:
// must be positive, evenly divisible by 4, not divisible by 100 unless divisible by 400

function isLeapYear(year) {
	console.log((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0));
	return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}


isLeapYear(2016);     // true
isLeapYear(2015);     // false
isLeapYear(2100);     // false
isLeapYear(2400);     // true
isLeapYear(240000);   // true
isLeapYear(240001);   // false
isLeapYear(2000);     // true
isLeapYear(1900);     // false
isLeapYear(1752);     // true
isLeapYear(1700);     // false
isLeapYear(1);        // false
isLeapYear(100);      // false
isLeapYear(400);      // true


// repeating the above, but any year before 1752 that is divisible by 4 counts as a leap year:

function isLeapYearWithJulian(year) {
  if (year <= 1752) {
    return year % 4 === 0;
  } else {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
  }
}


// write a function that takes one argument, between 1 and arg, all multiples of 3 and 5 should be returned

function multisum(num) {
	var result = 0;
	for (var i = 1; i <= num; i += 1) {
		if (i % 3 === 0 || i % 5 === 0) {
			result += i;
		}
	}
	return result;
}
multisum(3);      // 3
multisum(5);      // 8
multisum(10);     // 33
console.log(multisum(1000));   // 234168

// write a function that determines the totalised ASCII string value for a  string passed in:
function asciiValue(string) {
var result = 0;
  for (var i = 0; i < string.length; i++) {
    result += string.charCodeAt(i);
  }

  return result;
}

console.log(asciiValue('Launch School')); // 1251
