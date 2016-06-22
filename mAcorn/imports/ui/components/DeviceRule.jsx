import React, { Component, PropTypes } from 'react';

import { DeviceRules } from '../../../lib/collections/DeviceRules';

class DeviceRule extends Component {

    toggleEnabled() {
        let ruleId = this.props.rule._id;
        let enabled = !this.props.rule.enabled;
        let now = new Date().getTime();

        // Set the checked property to the opposite of its current value
        DeviceRules.update(ruleId, { $set: { enabled: enabled , updateAt : now } });
    }

    deleteThisRule() {
        DeviceRules.remove(this.props.rule._id);
    }

    render() {

        // Give a different className when they are checked off,
        // so that we can style them nicely in CSS
        let ruleClassName = this.props.rule.enabled ? 'checked' : '';

        return (
            <li className={ruleClassName}>
                <button className="delete" onClick={this.deleteThisRule.bind(this)}>
                    &times;
                </button>

                <input type="checkbox" readOnly
                       checked={this.props.rule.enabled}
                       onClick={this.toggleEnabled.bind(this)} />

                <span className="text">{this.props.rule.name}</span>
            </li>
        );
    }
}

DeviceRule.propTypes = {
    rule: PropTypes.object.isRequired,
};

export default DeviceRule;