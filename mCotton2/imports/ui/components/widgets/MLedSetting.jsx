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

import C_Devices from '../../../../lib/collections/Devices';

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

const profile2DataSources = (profile) => {
    let ret = [];

    if (profile.dataNames) {
        ret = ret.concat(profile.dataNames);
    }

    if (profile.eventNames) {
        ret = ret.concat(profile.eventNames);
    }

    console.log("profile2DataSources", ret);
    return ret;
};

const profile2Control = (profile) => {
    let ret = [];
    if (profile.controlNames) {
        ret = ret.concat(profile.controlNames);
    }
    console.log("profile2Control", ret);
    return ret;
};

const parseDataSources = (profile) => {
    let dataSources = profile2DataSources(profile);
    let fields = [];

    dataSources.map((item, index) => {
        fields.push(<MenuItem value={index} key={index} primaryText={item}/>);
    });

    return fields;

    //this.setState({
    //    fields: fields
    //});
}

class MLedSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Device Binding",

            entity: this.props.entity ? this.props.entity : null,
            fieldsList: this.props.fieldsList ? this.props.fieldsList : [],
            fieldValue: this.props.fieldValue ? this.props.fieldValue : 0,
        };


    }

    //handleDeviceChange(event, index, value) {
    //    event.preventDefault();
    //
    //    console.log("handleDeviceChange", this.props.entities[index]._id);
    //
    //    this.setState({
    //        deviceValue: value,
    //    });
    //
    //    this.updateDeviceProfile(this.props.entities[index]._id);
    //};

    handleFieldChange(event, index, value) {
        event.preventDefault();

        console.log("handleFieldChange", index, value);

        this.setState({
            fieldValue: value,
        });
    };


    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>
                    {this.state.title}
                </div>

                <Divider/>

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

MLedSetting.propTypes = {
    deviceId: PropTypes.string.isRequired,

    title: PropTypes.string,
    value: PropTypes.number,

    entity: PropTypes.object,

    dataSources: PropTypes.array,
};

//export default createContainer(() => {
//    return {
//        entities: C_Devices.find({}).fetch(),
//        entitiesCount: C_Devices.find({}).count()
//    };
//}, MLedSetting);


export default createContainer((props) => {
    let device = C_Devices.findOne({ _id: props.deviceId });
    let prof = ( device && device.deviceProfile) ? device.deviceProfile : {};

    return {
        entity: device,

        cellHeight: PropTypes.number,
        cols: PropTypes.number,

        profile: prof,

        fieldsList: parseDataSources(prof),
    };
}, MLedSetting);