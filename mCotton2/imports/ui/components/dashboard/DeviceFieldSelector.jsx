/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {orange500, blue500} from '../../../../node_modules/material-ui/styles/colors';

const styles = {
    title: {
        margin: 10,
    },
    output: {
        margin: 10,
    },
    button: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    slider: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: -15,
    },
    paper: {
        height: 320,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class DeviceFieldSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Device Binding",
            devicesList: this.props.entities ? this.props.entities : [],
            deviceValue: this.props.deviceValue ? this.props.deviceValue : 0,

            fieldsList: this.props.fieldsList ? this.props.fieldsList : [],
            fieldValue: this.props.fieldValue ? this.props.fieldValue : 0,
        };
    }

    handleDeviceChange(event, index, value) {
        event.preventDefault();

        console.log("handleDeviceChange", this.props.entities[index]._id);

        this.setState({
            deviceValue: value,
        });

        this.updateDeviceProfile(this.props.entities[index]._id);
    };

    handleFieldChange(event, index, value) {
        event.preventDefault();

        console.log("handleFieldChange", index, value);

        this.setState({
            fieldValue: value,
        });
    };

    updateDeviceProfile(deviceId) {
        let device = C_Devices.findOne({ _id: deviceId });
        let profile = device.deviceProfile;

        //TODO
        let fields = [];
        for (let j = 0; j < 10; j++) {
            fields.push(<MenuItem value={j} key={j} primaryText={device.name + ` ${j}`}/>);
        }

        this.setState({
            fields :fields
        });
    }

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>
                    {this.state.title}
                </div>

                <Divider/>

                <SelectField
                    value={this.state.deviceValue}
                    onChange={this.handleDeviceChange.bind(this)}
                    floatingLabelText="Device"
                    autoWidth={true}
                >
                    {this.props.entities.map((entity, index) => (
                    <MenuItem value={index} key={index} primaryText={entity.name}/>
                        ))}
                </SelectField>

                <SelectField
                    value={this.state.fieldValue}
                    onChange={this.handleFieldChange.bind(this)}
                    floatingLabelText="Data, Control or Event"
                    autoWidth={true}
                >
                    {this.state.fields}
                </SelectField>
            </Paper>
        )
    }
}

DeviceFieldSelector.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,

    entities: PropTypes.array.isRequired,
    entitiesCount: PropTypes.number.isRequired,

    fields: PropTypes.array.isRequired,
};
