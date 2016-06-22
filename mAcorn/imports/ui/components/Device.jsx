import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Devices } from '../../../lib/collections/Devices';

import MessageDatasList from './lists/MessageDatasList';

class Device extends Component {
    render() {
        return (
            <div>
                <li key="{this.props.device._id}"> {this.props.device.name} {this.props.device._id}</li>

                <MessageDatasList devId={this.props.device._id} />
            </div>
        );
    }
}

Device.propTypes = {
    device: PropTypes.object.isRequired,
};

export default Device;