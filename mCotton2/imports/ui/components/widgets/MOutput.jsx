/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {orange500, blue500} from 'material-ui/styles/colors';

import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    output: {
        margin: 10,
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    },
    paper: {
        height: 240,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MOutput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outputRows: this.props.outputRows ? this.props.outputRows : 5,
            output: this.props.output ? this.props.output : ["Welcome to Microduino\n", "==========\n"],

            title: this.props.widget.title ? this.props.widget.title : "Output",
            color: this.props.widget.color ? this.props.widget.color : orange500,

            openSetting: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps');

        this.getCheckPropsSource(nextProps);
    }

    getCheckPropsSource(props) {
        if (! props.datas || ! props.datas[0]) {
            return;
        }

        console.log("getCheckPropsSource data[0]", props.datas[0].createAt, JSON.stringify(props.datas[0].payload));

        try {
            let value = props.datas[0].payload[props.source];
            if (value) {
                let ret = JSON.parse(value);
                console.log("getCheckPropsSource", this.state.output, ret);

                if (this.state.output != ret) {
                    this.setState({ output: ret });
                }
            }
        } catch (e) {
            // ignore
        }
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

                <Divider/>

                <TextField
                    id={"" + this.props.widgetIndex}
                    style={styles.output}
                    multiLine={true}
                    rows={this.state.outputRows}
                    rowsMax={this.state.outputRows}
                    underlineShow={false}
                    disabled={true}
                    value={this.state.output.join('')}
                />

                <SettingDialog
                    openSetting={this.state.openSetting}
                    params={{
                        device: this.props.device,
                        widget: this.props.widget,
                        source: this.props.widget.source ? this.props.widget.source : "" }}/>

            </Paper>
        )
    }
}

MOutput.propTypes = {
    outputRows: PropTypes.number,
    output: PropTypes.array,

    title: PropTypes.string,
    color: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object.isRequired,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object.isRequired,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,

    widgetIndex: PropTypes.number.isRequired,
};

export default MOutput;
