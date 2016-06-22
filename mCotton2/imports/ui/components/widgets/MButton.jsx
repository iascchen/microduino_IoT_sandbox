/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import RaisedButton from 'material-ui/RaisedButton';

import {orange500, blue500} from 'material-ui/styles/colors';

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
            title: this.props.title ? this.props.title : "LED",
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

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>{this.state.title}</div>

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
            </Paper>
        )
    }
}

MButton.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
};

export default MButton;

