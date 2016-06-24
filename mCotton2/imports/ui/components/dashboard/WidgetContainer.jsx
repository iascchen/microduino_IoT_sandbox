/**
 * Created by chenhao on 16/6/22.
 */

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';

//import C_Devices from '../../../../lib/collections/Devices';
//import C_Widgets from '../../../../lib/collections/Widgets';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DeviceDashboard from './DeviceDashboard';
import WidgetList from '../widgets/WidgetList';

import MLed from './../widgets/MLed';
import MOutput from './../widgets/MOutput';

import MLabel from './../widgets/MLabel';
import MButton from './../widgets/MButton';
import MToggle from './../widgets/MToggle';
import MSlider from './../widgets/MSlider';
import MRangeSlider from './../widgets/MRangeSlider';
import MInput from './../widgets/MInput';
import MSelector from './../widgets/MSelector';
import MColor from './../widgets/MColor';
import MColorChrome from './../widgets/MColorChrome';
import MTimePicker from './../widgets/MTimePicker';
import MDatePicker from './../widgets/MDatePicker';

import MTerminal from './../widgets/MTerminal';

import WidgetSetting from './WidgetSetting';

const styles = {
    title: {
        margin: 10,
    },
    drawer: {
        margin: 10,
    },
    gridList: {
        width: 480,
        overflowY: 'auto',
        marginBottom: 24,
    },
    checkbox: {
        marginBottom: 16,
    },
    div: {
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
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

import SettingDialog from '../dashboard/SettingDialog';


class WidgetContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openSetting: false,
        };
    }

    handleSettingOpen() {
        this.setState({ openSetting: true });
    };

    handleSettingClose() {
        this.setState({ openSetting: false });
    };

    renderSubComponent(props) {
        if (!props.widget) {
            return;
        }

        switch (props.widget.widget) {
            case "MLed":
                return <MLed {...props}/>;
            case "MOutput":
                return <MOutput {...props} />;
            case "MLabel":
                return <MLabel {...props}/>;

            case "MButton":
                return <MButton {...props} />;
            case "MToggle":
                return <MToggle {...props} />;
            case "MSlider":
                return <MSlider {...props} />;
            case "MRangeSlider":
                return <MRangeSlider {...props} />;
            case "MInput":
                return <MInput {...props} />;
            case "MColor":
                return <MColor {...props} />;
            case "MColorChrome":
                return <MColorChrome {...props} />;
            case "MTimePicker":
                return <MTimePicker {...props} />;
            case "MDatePicker":
                return <MDatePicker {...props} />;
            case "MSelector":
                return <MSelector {...props} />;

            case "MTerminal":
                return <MTerminal {...props} />;
        }
    };

    renderWidgetSetting(props) {

        if (!props.widget) {
            return;
        }

        switch (props.widget.widgetType) {
            case "i":
                return (
                    <WidgetSetting params={{
                    device: props.device,
                    widget: props.widget,
                    target: props.widget.target ? props.widget.target : "" }}/>
                );
            case "o":
                return (
                    <WidgetSetting params={{
                    device: props.device,
                    widget: props.widget,
                    source: props.widget.source ? props.widget.source : "" }}/>
                );
            case "io":
                return (
                    <WidgetSetting params={{
                    device: props.device,
                    widget: props.widget,
                    source: props.widget.source ? props.widget.source : "",
                    target: props.widget.target ? props.widget.target : ""}}/>
                );
        }
    }

    renderWidgetContainer(props) {
        if (!props.widget) {
            return;
        }

        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.handleSettingClose.bind(this)}
            />
        ];

        return (
            <div>
                <Paper style={styles.paper} zDepth={2}>

                    <FlatButton style={styles.title}
                                onTouchTap={this.handleSettingOpen.bind(this)}>
                        {props.widget.title}
                    </FlatButton>

                    <Divider />

                    <div style={styles.div}>
                        {this.renderSubComponent(props)}
                    </div>

                </Paper>

                <Dialog
                    id={"D_" + this.props.widget._id}
                    style={styles.dialog}
                    title={this.props.title}
                    actions={actions}
                    modal={true}
                    open={this.state.openSetting}
                >
                    {this.renderWidgetSetting(props)}
                </Dialog>
            </div>
        )
    }

    render() {
        if (this.props.loading) {
            return (<CircularProgress />);
        }

        return this.renderWidgetContainer(this.props);
    }
}

WidgetContainer.propTypes = {
    title: PropTypes.string,

    widget: PropTypes.object.isRequired,
    device: PropTypes.object.isRequired,
    datas: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default createContainer(({ params }) => {
    return params;
}, WidgetContainer);