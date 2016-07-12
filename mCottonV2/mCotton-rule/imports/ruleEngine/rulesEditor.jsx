import Rules from './rules';

import MegaRuleEditor from './rules/mega-editor';

export const Editors = {
	MegaRuleEditor,
};

export default function getRuleEditor(rule) {
	for (let ruleType in Rules) {
		if (Rules.hasOwnProperty(ruleType)) {
			if (Rules[ruleType] === rule.constructor) {
				return Editors[`${ruleType}Editor`];
			}
		}
	}
}
