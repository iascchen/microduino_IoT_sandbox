import {EventEmitter} from 'events';

export default class RuleBodyBase {
	constructor(data) {
		this._event = new EventEmitter;
		
		if (data) {
			const keys = this.stringify();
			keys.forEach((k) => {
				this[k] = data[k];
			});
		} else {
			this.initEmpty();
		}
	}

	initEmpty() {
		throw new Error('RuleBodyBase: no `initEmpty` method');
	}
	
	triggerUpdate() {
		this._event.emit('change');
	}
	
	onUpdate(fn) {
		this._event.on('change', fn);
	}
	
	offUpdate(fn) {
		if (fn === undefined) {
			this._event.removeAllListeners('change');
		} else {
			this._event.removeListener('change', fn);
		}
	}

	generate() {
		throw new TypeError('rule content object must impl generate()');
	}
	
	stringify() {
		throw new TypeError('rule content object must impl stringify()');
	}
	
	toJSON() {
		const keys = this.stringify();
		const result = {
			type: this.constructor.name,
			data: {}
		};
		keys.forEach((k) => {
			result.data[k] = this[k];
		});
		return result;
	}
}
