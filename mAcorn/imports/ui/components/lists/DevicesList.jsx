import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Devices } from '../../../../lib/collections/Devices';

import Device from './../Device.jsx';

class DevicesList extends Component {
    renderDevices() {
        return this.props.devices.map((device) => (
            <Device key={device._id} device={device}/>
        ));
    };

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Devices ({this.props.devicesCount})</h1>
                </header>

                <ul>{this.renderDevices()}</ul>

            </div>
        )
    }
}

DevicesList.propTypes = {
    devices: PropTypes.array.isRequired,
    devicesCount: PropTypes.number.isRequired,
    currentUserId: PropTypes.string.isRequired,
};

export default createContainer(() => {
    return {
        devices: Devices.find({}).fetch(),
        devicesCount: Devices.find({}).count(),
        currentUserId: Meteor.userId(),
    };
}, DevicesList);