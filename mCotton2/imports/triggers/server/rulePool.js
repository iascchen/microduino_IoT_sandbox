/**
 * Created by chenhao on 16/6/12.
 */

import C_MessageDatas from '../../../lib/collections/MessageDatas';

export const RuleHandlers = {};

export const startRule = (rule) => {
    console.log("startRule : sourceIds", rule.sourceIds);

    let now = new Date().getTime();
    let obs_handler = C_MessageDatas.find({
        deviceId: { $in: rule.sourceIds },
        createAt: { $gt: now }
    }).observeChanges({
        added: function (id, entity) {
            rule.processor(rule, entity);
        }
    });

    RuleHandlers[rule._id] = { observer: obs_handler, current: {} };
};

export const stopRule = (rule) => {

    let handler = RuleHandlers[rule._id];
    if (handler) {
        console.log("stopRule", handler);

        handler.observer.stop();
        delete RuleHandlers[rule._id];
    }
};

RuleHandlers.startRule = startRule;
RuleHandlers.stopRule = stopRule;

Meteor.methods({
    'rule.start': startRule,
    'rule.stop': stopRule
});