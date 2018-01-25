var radio = (function(){
	var radios = {

	};

	function Radio(evtName){
		this.__evtName = evtName;
		this.__subscribers = [];
	}
	Radio.prototype.subscribe = function(subscriptionFn) {
		if (typeof subscriptionFn === 'function')
			this.__subscribers.push(subscriptionFn);
		return this;
	};
	Radio.prototype.broadcast = function(data) {
		this.__subscribers
			.forEach(function(subscriber){
				subscriber(data);
			});
		return this;
	};
	Radio.prototype.unsubscribe = function(subscriptionToUnsubscribe) {
		this.__subscribers = this.__subscribers
			.filter(function(subscriptionFn){
				return subscriptionFn !== subscriptionToUnsubscribe
			});
		return this;
	};
	function radio(evtName){
		radios[evtName] = radios[evtName] || new Radio(evtName);
		return radios[evtName];
	}

	return radio;
})();