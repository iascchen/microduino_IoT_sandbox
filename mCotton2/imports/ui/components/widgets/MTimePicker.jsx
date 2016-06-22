/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TimePicker from 'material-ui/TimePicker';

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
class MTimePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Time",
            value24: null,
        };
    }

    handleChangeTimePicker24(event, date) {
        console.log("handleChangeTimePicker24", date);

        this.setState({ value24: date });
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>{this.state.title}</div>

                <Divider/>

                <TimePicker
                    style={styles.time}
                    fullWidth={true}
                    autoOk={true}
                    format="24hr"
                    hintText="24hr Format"
                    value={this.state.value24}
                    onChange={this.handleChangeTimePicker24.bind(this)}
                />
            </Paper>
        )
    }
}

MTimePicker.propTypes = {
    title: PropTypes.string,
};

export default MTimePicker;

