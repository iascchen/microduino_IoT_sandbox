/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {orange500, grey500} from 'material-ui/styles/colors';

import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    button: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        padding: 0,
        margin: 10,
    },
    paper: {
        height: 120,
        width: 80,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Toggle",
            color: this.props.widget.color ? this.props.widget.color : orange500,

            toggled: this.props.toggled ? this.props.toggled : false,

            openSetting: false,
        };
    }

    toggleChanged(event) {
        event.preventDefault();

        console.log("handleToggleChange", value);
        let value = !this.state.toggled;

        this.setState({
            toggled: value,
        });

        let entity = {
            deviceId: this.props.device._id, token: this.props.device.secureToken,
        };
        entity[this.props.widget.target] = value;
        let wId = Meteor.call('control.add', entity);
    };

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>

                <RaisedButton style={styles.title}
                              fullWidth={true}
                              onTouchTap={this.handleSettingOpen.bind(this)}>{this.state.title}</RaisedButton>
                <Divider />

                <RaisedButton
                    fullWidth={true}
                    style={styles.button}
                    onMouseUp={this.toggleChanged.bind(this)}
                    onTouchEnd={this.toggleChanged.bind(this)}
                >

                    <ActionLightbulbOutline
                        style={styles.icon}
                        color={this.state.toggled ? this.state.color : grey500}/>

                </RaisedButton>

                <SettingDialog
                    openSetting={this.state.openSetting}
                    params={{
                        device: this.props.device,
                        widget: this.props.widget,
                        target: this.props.widget.target ? this.props.widget.target : "" }}/>

            </Paper>
        )
    }
}

MToggle.propTypes = {
    title: PropTypes.string,
    toggled: PropTypes.bool,
    color: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object.isRequired,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object.isRequired,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
};

export default MToggle;

