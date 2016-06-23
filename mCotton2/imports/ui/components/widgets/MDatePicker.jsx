/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import {orange500, blue500} from 'material-ui/styles/colors';

import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    time: {
        margin: 0,
    },
    paper: {
        height: 100,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};


// TODO add loop info
class MDatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Time",
            controlledDate: null,

            openSetting: false,
        };
    }

    handleChange(event, date) {
        console.log("handleChange", date);

        this.setState({ controlledDate: date });
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

                <DatePicker
                    style={styles.time}
                    fullWidth={true}
                    autoOk={true}
                    hintText="Date"
                    value={this.state.controlledDate}
                    onChange={this.handleChange.bind(this)}
                />
            </Paper>
        )
    }
}

MDatePicker.propTypes = {
    title: PropTypes.string,
};

export default MDatePicker;

