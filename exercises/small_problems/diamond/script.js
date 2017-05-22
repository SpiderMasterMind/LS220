// given an odd integer argument, construct a diamond using the * character
// The central line should have n number of diamonds
// diamond(1) logs *
// diamond(3) logs  
// * 
//***
// * 

// diamond(5) logs
//  *  
// ***
//*****
// ***
//  *

// The pattern is 1,3,5 .. n, n - 2, n - 4 until 1
// 

function diamond(n) {
  var result = [];
	var increment = 2;

  for (var i = 1; i <= n; i += increment) {
    result.push(' '.repeat((n-i)/2) + '*'.repeat(i));
  }

  for (var i = (n - 2); i >= 1; i -= increment) {
    result.push(' '.repeat((n-i)/2) + '*'.repeat(i));
  }

  return result.join('\n')
}
