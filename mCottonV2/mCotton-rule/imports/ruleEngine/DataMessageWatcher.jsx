import serverStatus from './serverStatus';
import C_MessageDatas from '../../lib/collections/MessageDatas';
import {MSG_DATA} from '../../lib/constants';

const deviceDataCache = {};
serverStatus.deviceDataCache = deviceDataCache;

export default class DataMessageWatcher {
	constructor(fn) {
		this._fn = fn;
		this._ob = false;
		this._watchingDevices = [];
		this._lastEventTime = false;

		this.changesHandler = this.changesHandler.bind(this)
	}
	
	getData() {
		const data = {};
		this._watchingDevices.forEach((id) => {
			data[id] = deviceDataCache[id];
		});
		return data;
	}
	
	changesHandler(logId, entity) {
		this._lastEventTime = entity.createAt;

		deviceDataCache[entity.deviceId] = entity.payload;

		this.fire();
	}

	fire() {
		console.log('change event fire');
		this._fn.call(undefined, this.getData());
	}
	
	start(deviceIdList) {
		serverStatus.watcherStarted = this;
		
		if (this.isStarted()) {
			if (_.difference(deviceIdList, this._watchingDevices).length === 0) {
				return;  // not changed
			}
			this.stop();
		}
		
		if (!this._lastEventTime) {
			this._lastEventTime = new Date().getTime();
		}
		this._watchingDevices = deviceIdList;
		
		this._ob = C_MessageDatas.find({
			deviceId: { $in: deviceIdList },
			msgType: MSG_DATA,
			createAt: { $gt: this._lastEventTime }
		}).observeChanges({
			added: this.changesHandler
		});
		
		deviceIdList.forEach((deviceId) => { // 补全所有device当前状态
			if (deviceDataCache[deviceId]) {
				return;
			}
			console.log('try to get data from watching device `%s`', deviceId);
			
			const current = C_MessageDatas.findOne({
				deviceId: deviceId,
				msgType: MSG_DATA,
			}, {
				sort: { createAt: -1 },
				limit: 1,
			});
			if (current) {
				console.log('\t\t', current.payload);
				deviceDataCache[deviceId] = current.payload;
			} else {
				console.log('\t\t has no data now');
			}
		})
	}
	
	isStarted() {
		return !!this._ob;
	}
	
	stop() {
		serverStatus.watcherStopped = this;
		
		if (this._ob) {
			this._ob.stop();
			this._ob = false;
			this._lastEventTime = 0;
		}
	}
}
