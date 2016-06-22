/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { ChromePicker } from 'react-color';

import {orange500, grey500} from 'material-ui/styles/colors';

const styles = {
    title: {
        margin: 10,
    },
    color: {
        marginTop: 15,
        marginLeft: 40,
        marginRight: 5,
    },
    paper: {
        height: 320,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MColorChrome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Color",
            color: this.props.color ? this.props.color : "#00ff00", // TODO, use microduino green
        };
    }

    handleChange(color) {
        console.log("color" , color.hex);

        this.setState({ color: color.hex })
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>
                    {this.state.title}
                </div>

                <Divider />

                <div style={styles.color}>
                    <ChromePicker
                        color={ this.state.color }
                        onChange={ this.handleChange.bind(this) }
                    />
                </div>
            </Paper>
        )
    }
}

MColorChrome.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
};

export default MColorChrome;