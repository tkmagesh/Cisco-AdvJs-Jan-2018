/*

as a method
as a function
using the call method
using the apply method
IIFE
using new

//invoked with new

1. this -> new object
2. this -> returned by default

*/

function Employee(id, name, salary){
	//this -> new object
	this.id = id;
	this.name = name;
	this.salary = salary;
	//this -> returned by default
}

function employeeFactory(id, name, salary){
	var emp = {
		id : id,
		name : name,
		salary : salary
	};
	return emp;
}