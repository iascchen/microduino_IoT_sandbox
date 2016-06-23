/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {orange500, grey500} from 'material-ui/styles/colors';

import WidgetSetting from './WidgetSetting';

const styles = {
    title: {
        margin: 10,
    },
    dialog: {
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class SettingDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openSetting: this.props.openSetting,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ openSetting: nextProps.openSetting });
    }

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    handleSettingClose() {
        this.setState({ openSetting: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.handleSettingClose.bind(this)}
            />,
        ];

        return (
            <Dialog
                style={styles.dialog}
                title={this.props.title}
                actions={actions}
                modal={true}
                open={this.state.openSetting}
            >
                <WidgetSetting params={this.props}/>
            </Dialog>
        )
    }
}

SettingDialog.propTypes = {
    title: PropTypes.string,
    openSetting: PropTypes.bool,

    device: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
};

export default createContainer(({ params }) => {
    return params;
}, SettingDialog);

