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
        height: 160,
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
            title: this.props.title ? this.props.title : "Output",
            outputRows: this.props.outputRows ? this.props.outputRows : 3,
            output: this.props.output ? this.props.output :["Welcome to Microduino\n","==========\n"],

            openSetting: false,
        };
    }

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
                    style={styles.output}
                    multiLine={true}
                    rows={this.state.outputRows}
                    rowsMax={this.state.outputRows}
                    underlineShow={false}
                    disabled={true}
                    value={this.state.output.join('')}
                />
            </Paper>
        )
    }
}

MOutput.propTypes = {
    title: PropTypes.string,
    outputRows: PropTypes.number,
    output: PropTypes.array,
};

export default MOutput;

