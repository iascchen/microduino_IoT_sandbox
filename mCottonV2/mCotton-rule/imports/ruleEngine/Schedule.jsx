class scheduleObject {
	constructor(id) {
		this._id = id;
		this.lastDispatch = 0;
		this._dispatchArgs = undefined;
		this._delay = 0;
	}

	_runCallback() {
		this.clearDelay();
		this.callback.apply(undefined, this._dispatchArgs);
		this.lastDispatch = Date.now();
	}

	clearDelay() {
		if (this._delay) {
			clearTimeout(this._delay);
			this._delay = 0;
		}
	}

	delayRunCallback() {
		const delay = this.nextAvailableTime() - Date.now();
		if (delay > 0) { // delay dispatch
			this.clearDelay();
			console.log('rule %s delay %sms', this._id, delay);
			this._delay = setTimeout(() => {
				this._runCallback();
			}, delay);
		} else { // run now !
			this._runCallback();
		}
	}

	setDispatchArgs(args) {
		this._dispatchArgs = args;
	}

	nextAvailableTime() {
		return this.interval + this.lastDispatch;
	}

	callback() {
		throw new TypeError('scheduleObject has no callback');
	}
}

export default class Scheduler {
	constructor() {
		this.scheduleMap = {};
		this.errorCallback = [];
	}

	schedule(id, interval, callback) {
		let obj = this.scheduleMap[id];
		if (!obj) {
			obj = this.scheduleMap[id] = new scheduleObject(id);
		}

		console.log('scheduler: id `%s` scheduled', id);

		obj.interval = interval;
		obj.callback = callback;
	}

	cancel(id) {
		let obj = this.scheduleMap[id];
		console.log('scheduler: id `%s` cancel schedule', id);
		if (obj) {
			obj.clearDelay();
			delete this.scheduleMap[id];
		}
	}

	dispatch(id, ...args) {
		let obj = this.scheduleMap[id];
		if (!obj) {
			return console.error('scheduler: id `%s` has not been scheduled', id);
		}

		console.log('scheduler: id `%s` dispatched', id);

		obj.setDispatchArgs(args);
		obj.delayRunCallback();
	}
}

