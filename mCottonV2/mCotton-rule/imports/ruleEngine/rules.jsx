import MegaRule from './rules/mega-rule';

const Rules = {
	MegaRule,
};

export default Rules;

export function unserializeRules(def) {
	const Construct = Rules[def.type];
	if (!Construct) {
		throw new TypeError(`Unknown rule body type: ${def.type}`);
	}
	
	return new Construct(def.data);
}
