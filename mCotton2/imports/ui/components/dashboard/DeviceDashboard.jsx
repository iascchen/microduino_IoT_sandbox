import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import CircularProgress from 'material-ui/CircularProgress';

import {GridList, GridTile} from 'material-ui/GridList';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import AvLibraryAdd from '../../../../node_modules/material-ui/svg-icons/av/library-add';
import ActionDeleteForever from '../../../../node_modules/material-ui/svg-icons/action/delete-forever';
import ContentClear from '../../../../node_modules/material-ui/svg-icons/content/clear';

import { MSG_DATA, MSG_CONTROL, MSG_EVENT } from '../../../../lib/constants';

import C_Devices from '../../../../lib/collections/Devices';
import C_Widgets from '../../../../lib/collections/Widgets';

import { WidgetList } from '../../components/widgets/WidgetList';
import WidgetContainer from './WidgetContainer';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from '../../../../node_modules/material-ui/styles/colors';

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
};

export default class DeviceDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addDrawerOpen: false,
            delDrawerOpen: false,
        };
    }

    handleAddCompDrawerToggle() {
        this.setState({
            addDrawerOpen: !this.state.addDrawerOpen
        });
    }

    handleAddCompDrawerClose(index) {
        this.setState({
            addDrawerOpen: false,
        });

        let widget = WidgetList[index];
        widget.deviceId = this.props.device._id;
        let wId = Meteor.call('widget.add', widget);

        //if (wId) {
        //    let tempDash = this.props.device.deviceDashboard;
        //    tempDash.push(wId);
        //
        //     this.state.dashboard.push(WidgetList[index]);
        //    C_Devices.update({ _id: this.props.device._id }, { $set: { deviceDashboard: tempDash } });
        //}
    }

    handleAddCompDrawerRequestChange(open) {
        this.setState({
            addDrawerOpen: open
        });
    }

    handleDelCompDrawerToggle() {
        this.setState({
            delDrawerOpen: !this.state.delDrawerOpen
        });
    }

    handleDelCompDrawerSelected(widgetId) {
        //console.log('handleDelCompDrawerSelected', index);

        let wId = C_Widgets.remove({ _id: widgetId });
        console.log("C_Widgets.remove", wId);

        //if (wId) {
        //    let tempDash = this.props.device.deviceDashboard;
        //    let pos = tempDash.indexOf(widgetId);
        //    tempDash.splice(pos, 1);
        //
        //    C_Devices.update({ _id: this.props.device._id }, { $set: { deviceDashboard: tempDash } });
        //}
    }

    handleDelCompDrawerRequestChange(open) {
        this.setState({
            delDrawerOpen: open
        });
    }

    render() {
        if (this.props.widgetLoading && this.props.deviceLoading) {
            return (<CircularProgress />);
        }

        if (!this.props.deviceExists) {
            return (<div>No Device</div>);
        }

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup float='right'>
                        <IconButton
                            onTouchTap={this.handleAddCompDrawerToggle.bind(this)}><AvLibraryAdd /></IconButton>
                        <IconButton
                            onTouchTap={this.handleDelCompDrawerToggle.bind(this)}><ActionDeleteForever /></IconButton>
                    </ToolbarGroup>
                </Toolbar>

                <GridList
                    style={styles.gridList}
                    cols={this.props.cols}
                    cellHeight={this.props.cellHeight}>

                    {this.props.widgets.map((widget, widgetIndex) => (
                    <GridTile style={styles.gridTile} key={widget._id} cols={widget.cols}
                              rows={widget.rows}>
                        <WidgetContainer
                            params={{widgetIndex,
                            widget,
                            device:this.props.device,
                            datas:this.props.datas,
                            loading:this.props.deviceLoading && this.props.widgetLoading}}/>
                    </GridTile>
                        ))}

                </GridList>

                <Drawer style={styles.drawer} docked={false} open={this.state.addDrawerOpen}
                        onRequestChange={this.handleAddCompDrawerRequestChange.bind(this)}>

                    <div style={styles.title}>Add</div>
                    <Divider />

                    {WidgetList.map((item, index) => (
                    <MenuItem
                        key={index}
                        value={index}
                        onTouchTap={this.handleAddCompDrawerClose.bind(this , index)}
                        style={styles.menu}
                    >
                        {item.title}
                    </MenuItem>
                        ))}

                </Drawer>

                <Drawer style={styles.drawer} docked={false} open={this.state.delDrawerOpen} openSecondary={true}
                        onRequestChange={this.handleDelCompDrawerRequestChange.bind(this)}>>
                    <div style={styles.title}>Delete</div>
                    <Divider />

                    {this.props.widgets.map((widget, index) => (
                    <MenuItem
                        key={widget._id}
                        value={widget._id}
                        rightIcon={<ContentClear />}
                        onTouchTap={this.handleDelCompDrawerSelected.bind(this , widget._id)}
                        style={styles.menu}
                    >
                        {widget.title}
                    </MenuItem>
                        ))}
                </Drawer>
            </div>
        )
    }
}

DeviceDashboard.propTypes = {
    deviceLoading: PropTypes.bool,
    device: PropTypes.object,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,

    widgetLoading: PropTypes.bool,
    widgets: PropTypes.array,
};