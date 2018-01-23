function memoize(process){
	var cache = {};

	return function (n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = process(n);
		return cache[n];
	}
}