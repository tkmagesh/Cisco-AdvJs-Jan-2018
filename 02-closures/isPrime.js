
var isPrime = (function(){
	var cache = {};

	function process(n){
		var result = true;
		for(var index = 2; index <= (n/2); index++){
			if (n % index === 0){
				result = false;
				break;
			}
		}
		return result;
	}
	function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = process(n);
		return cache[n];
	}

	return isPrime;
})();


var isOddOrEven = (function(){
	var cache = {};

	function process(n){
		return n % 2 === 0 ? 'even' : 'odd';
	}
	function isOddOrEven(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = process(n);
		return cache[n];
	}

	return isOddOrEven;
})();

