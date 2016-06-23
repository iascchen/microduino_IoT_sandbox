/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { SliderPicker } from 'react-color';

import {orange500, grey500} from 'material-ui/styles/colors';

import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    color: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    paper: {
        height: 160,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MColor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Color",
            color: this.props.color ? this.props.color : "#00ff00",  // TODO, use microduino green

            openSetting: false,
        };
    }

    handleChange(color) {
        console.log("color" , color.hex);

        this.setState({ color: color.hex })
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


                <Divider />

                <div style={styles.title}>
                    { JSON.stringify(this.state.color)}
                </div>

                <div style={styles.color}>
                    <SliderPicker
                        color={ this.state.color }
                        onChange={ this.handleChange.bind(this) }
                    />
                </div>

                <SettingDialog
                    openSetting={this.state.openSetting}
                    params={{
                        entity: this.props.entity,
                        widgetIndex : this.props.widgetIndex,
                        target: this.props.target ? this.props.target : "" }}/>
            </Paper>
        )
    }
}

MColor.propTypes = {
    title: PropTypes.string,
    color: PropTypes.object,
};

export default MColor;

