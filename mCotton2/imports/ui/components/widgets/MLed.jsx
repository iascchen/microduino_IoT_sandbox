/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {orange500, grey500} from 'material-ui/styles/colors';

const styles = {
    title: {
        margin: 10,
    },
    div: {
        height: 120,
        width: 80,
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

class MLed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            on: false,

            title: this.props.widget.title ? this.props.widget.title : "LED",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getCheckPropsSource(nextProps);
    }

    getCheckPropsSource(props) {
        if (!props.datas || !props.datas[0]) {
            return;
        }

        console.log("getCheckPropsSource data[0]", props.datas[0].createAt, JSON.stringify(props.datas[0].payload));

        try {
            let value = "" + props.datas[0].payload[props.source];
            if (value) {
                let ret = JSON.parse(value);
                console.log("getCheckPropsSource", this.state.on, ret);

                if (this.state.on != ret) {
                    this.setState({ on: ret });
                }
            }
        } catch (e) {
            // ignore
        }
    };

    render() {
        return (
            <div style={styles.div}>
                <ActionLightbulbOutline
                    style={styles.icon}
                    color={ this.state.on ? this.state.color : grey500 }/>
            </div>
        )
    }
}

MLed.propTypes = {
    on: PropTypes.bool,
    title: PropTypes.string,
    color: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object.isRequired,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object.isRequired,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
};

export default MLed;

