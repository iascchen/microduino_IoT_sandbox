/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {orange500, blue500} from 'material-ui/styles/colors';

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
    checkbox: {
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

class MButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Button",

            openSetting: false,
        };
    }

    buttonDown(event) {
        event.preventDefault();
        console.log("buttonDown");
    };

    buttonUp(event) {
        event.preventDefault();
        console.log("buttonUp");
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
                    onMouseDown={this.buttonDown.bind(this)}
                    onTouchStart={this.buttonDown.bind(this)}

                    onMouseUp={this.buttonUp.bind(this)}
                    onTouchEnd={this.buttonUp.bind(this)}
                >

                    <ActionPowerSettingsNew style={styles.icon}/>

                </RaisedButton>

                <SettingDialog
                    openSetting={this.state.openSetting}
                    params={{
                        entity: this.props.entity,
                        widgetIndex : this.props.widgetIndex,
                        target: this.props.target ? this.props.target : "" }}/>
            </Paper>
        )
    }
}

MButton.propTypes = {
    title: PropTypes.string,
    on: PropTypes.bool,
    color: PropTypes.string,

    loading: PropTypes.bool,
    entity: PropTypes.object,
    entityExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
};

export default MButton;

