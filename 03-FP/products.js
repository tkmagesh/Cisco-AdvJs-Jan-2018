var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
];

//sort
//filter
//groupBy

/*console.group('Default List');
	console.table(products);
console.groupEnd();

console.group('Sort');
	console.group('Default Sort [products by id]');
		//sort();
		console.table(products);
	console.groupEnd();

	console.group('Sort any list by any attribute');
		console.group('Products by cost');
			//sort()
			console.table(products);
		console.groupEnd();
		console.group('Products by units');
			//sort()
			console.table(products);
		console.groupEnd();
	console.groupEnd();
console.groupEnd();*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default Sort [products by id]', function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j = i+1; j < products.length; j++){
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
				}
		}
		sort();
		console.table(products);
	});

	describe('Sort any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j = i+1; j < list.length; j++){
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});
		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Sort any list by any comparison', function(){
		function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i++)
				for(var j = i+1; j < list.length; j++){
					var compareResult = comparerFn(list[i], list[j]);
					if (compareResult > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}
		describe('Products by value [cost * units]', function(){
			var productComparerByValue = function productComparerByValue(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			};
			sort(products, productComparerByValue);
			console.table(products);
		});
	});
});

describe('filter', function(){
	describe('default filter [ stationary products] ', function(){
		function filterStationaryProducts(){
			var result = [];
			for(var index = 0, count = products.length; index < count; index++){
				if (products[index].category === 'stationary')
					result.push(products[index]);
			}
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});
	describe('Any list by any criteria', function(){
		function filter(list, criteria){
			var result = [];
			for(var index = 0, count = list.length; index < count; index++){
				if (criteria(list[index]))
					result.push(list[index]);
			}
			return result;
		}
		function negate(criteriaFn){
			return function negatedCriteria(/*arguemnts*/){
				return !criteriaFn.apply(undefined, arguments);
			}
		}
		describe('Filter by cost', function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			};
			/*var affordableProductCriteria = function(product){
				return !costlyProductCriteria(product);
			};*/
			var affordableProductCriteria = negate(costlyProductCriteria);

			describe('costly products [cost > 50]', function(){
				/*var costlyProductCriteria = function(product){
					return product.cost > 50;
				};*/
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});
			describe('affordable products [cost <= 50]', function(){
				/*var affordableProductCriteria = function(product){
					return product.cost <= 50;
				};*/
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});
		});

		describe('Filter by units', function(){
			var understockedProductCriteria = function(product){
				return product.units < 60;
			};
			/*var wellstockedProductCriteria = function(product){
				return !understockedProductCriteria(product);
			};*/
			var wellstockedProductCriteria = negate(understockedProductCriteria);
			describe('understocked products [units < 60]', function(){
				/*var understockedProductCriteria = function(product){
					return product.units < 60;
				};*/
				var understockedProducts = filter(products, understockedProductCriteria);
				console.table(understockedProducts);
			});
			describe('wellstocked products [units >= 60]', function(){
				/*var wellstockedProductCriteria = function(product){
					return product.units >= 60;
				};*/
				var wellstockedProducts = filter(products, wellstockedProductCriteria);
				console.table(wellstockedProducts);
			});
		});
	});
});
