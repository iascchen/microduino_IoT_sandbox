/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';

import {orange500, blue500} from 'material-ui/styles/colors';

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
            title: this.props.title ? this.props.title : "Time",
            controlledDate: null,
        };
    }

    handleChange(event, date) {
        console.log("handleChange", date);

        this.setState({ controlledDate: date });
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>{this.state.title}</div>

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

