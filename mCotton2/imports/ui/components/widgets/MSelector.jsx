/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

class MSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Selector",
            value: this.props.value ? this.props.value : 1,

            openSetting: false,
        };
    }

    handleChange(event, index, value) {
        event.preventDefault();

        console.log("handleChange", index, value);

        this.setState({
            value: value,
        });
    };

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    render() {
        const items = [];
        for (let i = 0; i < 10; i++ ) {
            items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
        }

        return (
            <Paper style={styles.paper} zDepth={2}>
                <RaisedButton style={styles.title}
                              fullWidth={true}
                              onTouchTap={this.handleSettingOpen.bind(this)}>{this.state.title}</RaisedButton>

                <Divider/>

                <SelectField
                    style={styles.input}
                    fullWidth={true}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    autoWidth={true}
                >
                    {items}
                </SelectField>
            </Paper>
        )
    }
}

MSelector.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
};

export default MSelector;

