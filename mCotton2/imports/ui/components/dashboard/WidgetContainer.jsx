/**
 * Created by chenhao on 16/6/22.
 */

import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';

//import C_Devices from '../../../../lib/collections/Devices';
//import C_Widgets from '../../../../lib/collections/Widgets';

import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DeviceDashboard from './DeviceDashboard';
import WidgetList from '../widgets/WidgetList';

import MPaper from './../widgets/Paper';
import MWdigets from './../widgets';

import WidgetSetting from './WidgetSetting';

const styles = {
    mWidget: {
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
    },
    title: {
        margin: 10,
    },
    drawer: {
        margin: 10,
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

        if (!props.widget) {
            return;
        }
        const widgetName = props.widget.widget;
        if (!MWdigets.hasOwnProperty(widgetName)) {
            throw new TypeError(`WidgetContainer: no such widget "${widgetName}"`);
        }
        const SubWidget = MWdigets[widgetName];

        return (
            <div className="mWidget" style={styles.mWidget}>
                <MPaper>

                    <FlatButton style={styles.title}
                                onTouchTap={this.handleSettingOpen.bind(this)}>
                        {props.widget.title}
                    </FlatButton>

                    <Divider />

                    <div style={styles.div}>
                        <SubWidget {...props} />
                    </div>

                </MPaper>

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
