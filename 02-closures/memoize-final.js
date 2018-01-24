function memoize(process){
	var cache = {};
	return function (/*arguments*/){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = process.apply(undefined, arguments);
		return cache[key];
	}
}

var add = memoize(function(x,y){
	console.log('processing ', arguments);
	return x + y;
})

var add2 = memoize(function(x,y,z){
	console.log('processing ', arguments);
	return x + y + z;
})