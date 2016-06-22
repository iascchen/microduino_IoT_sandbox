/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, grey500} from 'material-ui/styles/colors';

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
    paper: {
        height: 120,
        width: 80,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggled: this.props.toggled ? this.props.toggled : false,
            title: this.props.title ? this.props.title : "LED",
        };
    }

    toggleChanged(event) {
        event.preventDefault();

        console.log("handleToggleChange", !this.state.toggled);

        this.setState({
            toggled: !this.state.toggled,
        });
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>

                <div style={styles.title}>{this.state.title}</div>

                <Divider />

                <RaisedButton
                    fullWidth={true}
                    style={styles.button}
                    onMouseUp={this.toggleChanged.bind(this)}
                    onTouchEnd={this.toggleChanged.bind(this)}
                >

                    <ActionLightbulbOutline
                        style={styles.icon}
                        color={this.state.toggled ? orange500 : grey500}/>

                </RaisedButton>
            </Paper>
        )
    }
}

MToggle.propTypes = {
    title: PropTypes.string,
    toggled: PropTypes.bool,
};

export default MToggle;

