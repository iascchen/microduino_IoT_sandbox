/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

import {orange500, blue500} from 'material-ui/styles/colors';

import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    slider: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
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

class MSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Slider",
            min: this.props.min ? this.props.min : 0,
            max: this.props.max ? this.props.max : 100,
            step: this.props.step ? this.props.step : 1,
            value: this.props.value ? this.props.value : 0,

            openSetting: false,
        };
    }

    handleChange(event, value) {
        event.preventDefault();

        console.log("handleChange", value);

        this.setState({
            value: value,
        });
    };

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    render() {
        return (
            <Paper style={styles.paper} zDepth={2}>
                <RaisedButton style={styles.title}
                              fullWidth={true}
                              onTouchTap={this.handleSettingOpen.bind(this)}>{this.state.title} : {this.state.value}</RaisedButton>

                <Divider/>

                <Slider
                    style={styles.slider}
                    min={this.state.min}
                    max={this.state.max}
                    step={this.state.step}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                />
            </Paper>
        )
    }
}

MSlider.propTypes = {
    title: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
};

export default MSlider;

