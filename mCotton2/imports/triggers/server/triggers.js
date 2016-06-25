/**
 * Created by chenhao on 16/6/16.
 */

/**
 * Created by chenhao on 16/6/10.
 */

import { Meteor } from 'meteor/meteor';

import C_TriggerRules from '../../../lib/collections/TriggerRules';

import {startRule, stopRule} from './rulePool';
import {Rules} from './rules';

const execMyRules = (ownerId) => {
    const owner = Meteor.users.findOne({ _id: ownerId });
    const rules = C_TriggerRules.find({ ownerId: owner._id, enabled: true }).fetch();

    rules.forEach((rule) => {
        startRule(rule);
    });
};

Meteor.startup(function () {

    const enabled = Meteor.settings.rule.enabled;
    if (enabled) {
        startRule(Rules.rule_1, 3000);
        startRule(Rules.rule_2, 3000);
        startRule(Rules.rule_3, 3000);
        startRule(Rules.rule_4, 3000);
        startRule(Rules.rule_5, 3000);
        startRule(Rules.rule_6, 3000);
        startRule(Rules.rule_7, 3000);

        console.log("Rules", JSON.stringify(Rules));
    }
});

//setTimeout(function () {
//    stopRule(Rules.rule_1);
//}, 20000);