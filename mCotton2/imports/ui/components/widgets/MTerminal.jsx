/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import {orange500, blue500} from 'material-ui/styles/colors';

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
    button: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,

    },
    icon: {
        width: 30,
        height: 30,
        padding: 0,
        margin: 15,
    },
    checkbox: {
        margin: 10,
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

class MTerminal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Terminal",
            outputRows: this.props.outputRows ? this.props.outputRows : 6,
            output: this.props.output ? this.props.output : ["Welcome to Microduino\n","==========\n","\n"],
            input: this.props.input ? this.props.input : "",
        };
    }

    handleChange(event, value) {
        event.preventDefault();

        this.setState({
            input: value,
        });

        if (value.endsWith('\n')) {
            console.log("handleChanged", value);

            let queue = this.state.output;
            queue.push(value);
            if (queue.length > this.state.outputRows) {
                queue.shift();
            }

            this.setState({
                output: queue,
                input: "",
            });
        }
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <div style={styles.title}>{this.state.title}</div>

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

                <Divider/>

                <TextField
                    hintText=">"
                    multiLine={true}
                    rows={1}
                    rowsMax={1}
                    value={this.state.input}
                    onChange={this.handleChange.bind(this)}
                />
            </Paper>
        )
    }
}

MTerminal.propTypes = {
    title: PropTypes.string,
    outputRows: PropTypes.number,
    output: PropTypes.array,
    input: PropTypes.string,
};

export default MTerminal;

