import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { DeviceRules } from '../../../../lib/collections/DeviceRules';

import DeviceRule from '../DeviceRule.jsx';

class DeviceRulesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideDisabled: true,
        };
    }

    toggleHideDisabled() {
        this.setState({
            hideDisabled: !this.state.hideDisabled,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        DeviceRules.insert({
            name: text,
            enable: true,
            ownerId: Meteor.userId(),           // _id of logged in user
            owner: Meteor.user().profile.name,  // username of logged in user
            createdAt: new Date() // current time
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }


    renderRules() {
        let filteredRules = this.props.rules;

        if (this.state.hideDisabled) {
            filteredRules = filteredRules.filter(rule => rule.enabled);
        }

        return filteredRules.map((rule) => (
            <DeviceRule key={rule._id} rule={rule}/>
        ));
    };

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Rules ({this.props.enabledCount})</h1>

                    <label className="hide-disabled">
                        <input type="checkbox" readOnly
                               checked={this.state.hideDisabled}
                               onClick={this.toggleHideDisabled.bind(this)}/>
                        Hide Disabled Tasks
                    </label>

                    { this.props.currentUserId ?
                        (<form className="new-rule" onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text" ref="textInput" placeholder="Type to add new rule"/>
                        </form>)
                        : '' }
                </header>

                <ul>{this.renderRules()}</ul>

            </div>
        )
    }
}

DeviceRulesList.propTypes = {
    rules: PropTypes.array.isRequired,
    enabledCount: PropTypes.number.isRequired,
    currentUserId: PropTypes.string.isRequired,
};

export default createContainer(() => {
    return {
        rules: DeviceRules.find({}, { sort: { createdAt: -1 } }).fetch(),
        enabledCount: DeviceRules.find({ enabled: { $ne: false } }).count(),
        currentUserId: Meteor.userId(),
    };
}, DeviceRulesList);

