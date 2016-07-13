class ServerStatus {
	constructor() {
		this.status = {
			started: false,
			startedRules: [],
			lastRunRules: [],
			deviceDataCache: {},
			watchers: [],
		}
	}
	
	set ruleRegistry(v) {
		this.status.ruleRegistry = v;
	}
	
	set started(v) {
		this.status.started = v;
	}
	
	set ruleStarted(v) {
		if (this.status.startedRules.indexOf(v) === -1) {
			this.status.startedRules.push(v);
		}
	}
	
	set ruleStopped(v) {
		const i = this.status.startedRules.indexOf(v);
		if (i !== -1) {
			this.status.startedRules.splice(i, 1);
		}
	}
	
	set watcherStarted(v) {
		if (this.status.watchers.indexOf(v) === -1) {
			this.status.watchers.push(v);
		}
	}
	
	set watcherStopped(v) {
		const i = this.status.watchers.indexOf(v);
		if (i !== -1) {
			this.status.watchers.splice(i, 1);
		}
	}
	
	set lastRunRules(v) {
		if (this.status.lastRunRules.length >= 10) {
			this.status.lastRunRules.length = 9;
		}
		this.status.lastRunRules.unshift(v);
	}
	
	set deviceDataCache(v) {
		this.status.deviceDataCache = v;
	}
}

const serverStatus = new ServerStatus;

Meteor.methods({
	ruleEngineStatus() {
		return serverStatus.status;
	},
});

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
export default serverStatus;
