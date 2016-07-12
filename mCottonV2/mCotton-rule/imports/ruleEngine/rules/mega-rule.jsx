import RuleBodyBase from './ruleBodyBase';

export default class MegaRule extends RuleBodyBase {
	initEmpty() {
		this._content = '';
	}
	
	get content() {
		return this._content;
	}
	
	set content(v) {
		this.triggerUpdate();
		this._content = v;
	}
	
	setContent(v) {
		this.content = v;
	}

	generate() {
		return this._content;
	}
	
	stringify() {
		return ['content'];
	}
}
