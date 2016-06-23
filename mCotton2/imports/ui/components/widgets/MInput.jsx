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
    input: {
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

class MInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Input",
            input: this.props.input ? this.props.input : "",

            openSetting: false,
        };
    }

    handleChange(event, value) {
        event.preventDefault();

        console.log("handleChanged", value);

        this.setState({
            input: value,
        });
    }

    handleBlur(event) {
        event.preventDefault();
        console.log("handleBlur", this.state.input);
    }

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    render(){
        return (
            <Paper style={styles.paper} zDepth={2}>
                <RaisedButton style={styles.title}
                              fullWidth={true}
                              onTouchTap={this.handleSettingOpen.bind(this)}>{this.state.title}</RaisedButton>

                <Divider/>

                <TextField
                    style={styles.input}
                    hintText=">"
                    fullWidth={true}
                    multiLine={false}
                    value={this.state.input}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                />
            </Paper>
        )
    }
}

MInput.propTypes = {
    title: PropTypes.string,
    input: PropTypes.string,
};

export default MInput;

