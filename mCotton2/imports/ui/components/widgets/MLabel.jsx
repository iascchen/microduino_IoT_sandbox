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

class MLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Output",
            output: this.props.output ? this.props.output : "Welcome",

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
                    rows={1}
                    rowsMax={1}
                    underlineShow={false}
                    disabled={true}
                    value={this.state.output}
                />
            </Paper>
        )
    }
}

MLabel.propTypes = {
    title: PropTypes.string,
    output: PropTypes.string,
};

export default MLabel;

