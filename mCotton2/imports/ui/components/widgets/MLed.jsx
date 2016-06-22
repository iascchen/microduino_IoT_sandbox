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

import MLedSetting from './MLedSetting';

const styles = {
    title: {
        margin: 10,
    },
    div: {
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

class MLed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            on: this.props.on ? this.props.on : false,

            title: this.props.title ? this.props.title : "LED",
            color: this.props.color ? this.props.color : orange500,
            openSetting: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');

        this.getCheckPropsSource(nextProps);
    }

    getCheckPropsSource(props) {
        console.log("getCheckPropsSource data[0]", props.datas[0].createAt, JSON.stringify(props.datas[0].payload));

        try {
            let value = props.datas[0].payload[props.source];
            if (value) {
                let ret = JSON.parse(value);
                console.log("getCheckPropsSource", this.state.on, ret);

                if (this.state.on != ret) {
                    this.setState({ on: ret });
                }
            }
        } catch (e) {
            // ignore
        }
    };

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    handleSettingClose() {
        this.setState({ openSetting: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleSettingClose.bind(this)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onTouchTap={this.handleSettingOpen.bind(this)}
            />,
        ];

        return (
            <Paper style={styles.paper} zDepth={2}>

                <RaisedButton style={styles.title}
                              fullWidth={true}
                              onTouchTap={this.handleSettingOpen.bind(this)}>{this.state.title}</RaisedButton>

                <Divider />

                <div style={styles.div}>
                    <ActionLightbulbOutline
                        style={styles.icon}
                        color={ this.state.on ? this.state.color : grey500 }/>
                </div>

                <Dialog
                    title="Setting"
                    actions={actions}
                    modal={true}
                    open={this.state.openSetting}
                >
                    <MLedSetting deviceId={this.props.deviceId}/>
                </Dialog>
            </Paper>
        )
    }
}

MLed.propTypes = {
    title: PropTypes.string,
    on: PropTypes.bool,
    color: PropTypes.string,

    loading: PropTypes.bool,
    entity: PropTypes.object,
    entityExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
};

export default MLed;

