var radio = (function(){
	var radios = {

	};

	class Radio{
		constructor(evtName){
			this.__evtName = evtName;
			this.__subscribers = [];
		}
		subscribe(subscriptionFn) {
			if (typeof subscriptionFn === 'function')
				this.__subscribers.push(subscriptionFn);
			return this;
		}
		broadcast(data) {
			this.__subscribers.forEach(subscriber => subscriber(data));
			return this;
		}
		unsubscribe(subscriptionToUnsubscribe) {
			this.__subscribers = this.__subscribers.filter(subscriptionFn => subscriptionFn !== subscriptionToUnsubscribe);
			return this;
		}
	}
	
	function radio(evtName){
		radios[evtName] = radios[evtName] || new Radio(evtName);
		return radios[evtName];
	}

	return radio;
})();