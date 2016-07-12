import {EventEmitter} from 'events';
import {unserializeRules} from './rules';

class IO {
	constructor(deviceId, name, type, extra) {
		this.__ro = {
			deviceId, name, type, extra
		};
		this._uName = undefined;
	}
	
	get deviceId() {
		return this.__ro.deviceId;
	}
	
	get type() {
		return this.__ro.type;
	}
	
	get realName() {
		return this.__ro.name;
	}
	
	get displayName() {
		return this._uName || this.__ro.name;
	}
	
	get extra() {
		return this.__ro.extra;
	}
	
	set userName(v) {
		this._uName = v;
	}
	
	get userName() {
		return this._uName;
	}
	
	set value(v) {
		this._value = v;
	}
	
	get value() {
		return this._value;
	}
	
	toJSON() {
		return _.extend({ userName: this._uName }, this.__ro);
	}
}

export default class RuleDefine {
	constructor(savedData) {
		if (savedData) {
			this._usedDevices = savedData.usedDevices;
			this._controls = extractFromArray(savedData.controls);
			this._datas = extractFromArray(savedData.datas);
			this._content = savedData.content.map(unserializeRules);
			this.title = savedData.title;
			this.desc = savedData.desc;
			this._id = savedData._id;
		} else {
			this._usedDevices = [];
			this._controls = {};
			this._datas = {};
			this._content = [];
			this.title = '新建 未命名规则';
			this.desc = '';
			this._id = false;
		}
		this._event = new EventEmitter;
		this._isSaved = true;
	}
	
	markSaved() {
		this._isSaved = true;
	}
	
	preSave() {
		let errMsg;
		const ctls = this.mapControl((i) => i.displayName);
		if (errMsg = ensureNoNameConflict('control', ctls)) {
			return errMsg;
		}
		const datas = this.mapData((i) => i.displayName);
		if (errMsg = ensureNoNameConflict('data', datas)) {
			return errMsg;
		}
		if (errMsg = ensureNoNameConflict('control and data', datas.concat(ctls))) {
			return errMsg;
		}
		if (!this.title) {
			return 'rule title is required';
		}
		return false;
	}
	
	toJSON() {
		return {
			title: this.title,
			desc: this.desc,
			usedDevices: this._usedDevices,
			controls: mergeAsArray(this._controls),
			datas: mergeAsArray(this._datas),
			content: this._content,
		};
	}
	
	triggerUpdate() {
		this._isSaved = false;
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
	
	/* device */
	isUsingDevice(deviceId) {
		return this._usedDevices.some((id) => id === deviceId);
	}
	
	useDevice(deviceId) {
		return this._usedDevices.push(deviceId);
	}
	
	isUsingAnyDevice() {
		return this._usedDevices.length > 0;
	}
	
	mapDevice(fn) {
		return this._usedDevices.map(fn);
	}
	
	getDeviceList() {
		return this._usedDevices.slice();
	}
	
	/* 
	 END device
	 ---
	 control & data
	 */

	getDataDeviceList() {
		return Object.keys(this._datas);
	}

	getControlDeviceList() {
		return Object.keys(this._controls);
	}
	
	pushControl(deviceId, data) {
		const { name, type, ...extra }=data;
		const item = new IO(deviceId, name, type, extra);
		const arr = ensureKey(this._controls, deviceId);
		
		const exists = arr.findIndex((io) => deviceId === io.deviceId && io.realName === name);
		
		return exists === -1 ? arr.push(item) : exists;
	}
	
	mapControl(fn) {
		const cs = Object.keys(this._controls).map((n) => this._controls[n]);
		return Array.prototype.concat.apply([], cs).map(fn);
	}
	
	pushData(deviceId, data) {
		const { name, type, ...extra }=data;
		const item = new IO(deviceId, name, type, extra);
		const arr = ensureKey(this._datas, deviceId);
		
		const exists = arr.findIndex((io) => deviceId === io.deviceId && io.realName === name);
		
		return exists === -1 ? arr.push(item) : exists;
	}
	
	mapData(fn, op) {
		const cs = Object.keys(this._datas).map((n) => this._datas[n]);
		const all = Array.prototype.concat.apply([], cs);
		if (!op) {
			op = 'map';
		}
		return all[op](fn);
	}
	
	/*
	 END control & data
	 ---
	 content
	 */
	addRuleBody(contentObject) {
		contentObject.onUpdate(this.triggerUpdate.bind(this));
		return this._content.push(contentObject);
	}
	
	mapRuleBody(fn) {
		return this._content.map(fn);
	}
	
	generateCode() {
		return this.mapRuleBody((body) => {
			return body.generate();
		}).join('\n');
	}
}

function ensureKey(obj, key) {
	if (!obj[key]) {
		obj[key] = [];
	}
	return obj[key];
}

function mergeAsArray(obj) {
	const cs = Object.keys(obj).map((n) => obj[n]);
	return Array.prototype.concat.apply([], cs);
}

function extractFromArray(arr) {
	const ret = {};
	arr.forEach((data) => {
		const { deviceId, name, type, extra, userName } = data;
		const item = new IO(deviceId, name, type, extra);
		item.userName = userName;
		const arr = ensureKey(ret, deviceId);
		arr.push(item);
	});
	return ret;
}

function ensureNoNameConflict(type, names) {
	let hasError = false;
	names.some((name) => {
		if (names.lastIndexOf(name) !== names.indexOf(name)) {
			hasError = `duplicate ${type} name: ${name}`;
			return true;
		}
	});
	return hasError;
}
