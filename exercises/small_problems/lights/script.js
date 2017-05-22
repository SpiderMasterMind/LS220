// given a bank of switches, 1 to n. each is connected to a  light that is initially off.
// The input is the number of times we walk to each switch.  The first time all switches are toggled, the second time every other
// the third, every third and so on
// The function should return an array stating which switches are on.

// When n - 5
// All on
// 1,3,5 on 2,4, off - 2
//  1, 5 on 2,3,4 off - 3
//  1,4,5 on 2,3, off - 4 
// 1,4 on 2,3,5 - on - 5

// given an array 1, 2, 3 .. n
// step through each, given a 'pass number'
// If the light address (index + 1) is divisible by the pass number, change its state: i % pass number === 0
// do this until pass number === n

// an on and off array
// {1: 'on', 2: 'off'} then convert to array

function lights(n) {
	pass = 1;
	result = {};
	lightsOn = [];
	for (var i = 1; i <= n; i += 1) {
		result[i] = false;
	}
	
	while (pass <= n) {
		for (light in result) {
			if (Number(light) % pass  === 0) {
				result[light] = !result[light]
			}
		}
		pass += 1;
	}
	
	for (light in result) {
		if (result[light]) {
			lightsOn.push(Number(light));
		}
	}
	return lightsOn;
}
