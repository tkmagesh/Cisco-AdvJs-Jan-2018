function memoize(processFn){
	var cache = {};

	return function (n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = processFn(n);
		return cache[n];
	}
}

var isOddOrEven = memoize(function process(n){
	return n % 2 === 0 ? 'even' : 'odd';
});

var isPrime = memoize(function process(n){
	for(var index = 2; index <= (n/2); index++){
		if (n % index === 0){
			return false;
		}
	}
	return true;
});