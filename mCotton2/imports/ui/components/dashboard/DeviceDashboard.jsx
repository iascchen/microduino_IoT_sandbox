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

import MCanvas from './../widgets/MCanvas';
import {WidgetList, getSubComponent } from './../widgets/WidgetList';

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

            // dashboard: this.props.entity.deviceDashboard ? this.props.entity.deviceDashboard : [],
        };
    }

    handleAddCompDrawerToggle() {
        this.setState({
            addDrawerOpen: !this.state.addDrawerOpen
        });
    }

    handleAddCompDrawerClose(index) {
        //console.log("handleAddCompDrawerClose", index);

        let tempDash = this.props.entity.deviceDashboard;
        tempDash.push(WidgetList[index]);

        this.setState({
            addDrawerOpen: false,
            //dashboard: tempDash,
        });

        // this.state.dashboard.push(WidgetList[index]);
        C_Devices.update({ _id: this.props.entity._id }, { $set: { deviceDashboard: tempDash } });
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

    handleDelCompDrawerSelected(index) {
        //console.log('handleDelCompDrawerSelected', index);
        let tempDash = this.props.entity.deviceDashboard;
        tempDash.splice(index, 1);

        //this.setState({
        //    dashboard: tempDash,
        //});

        C_Devices.update({ _id: this.props.entity._id }, { $set: { deviceDashboard: tempDash } });
    }

    handleDelCompDrawerRequestChange(open) {
        this.setState({
            delDrawerOpen: open
        });
    }


    render() {
        if(this.props.loading){
            return (<CircularProgress />);
        }

        if(!this.props.entityExists){
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

                    {this.props.entity.deviceDashboard.map((item, index) => (
                    <GridTile style={styles.gridTile} key={index} cols={item.cols} rows={item.rows}>
                        { getSubComponent(item, this.props) }
                    </GridTile>
                        ))}

                </GridList>

                <Drawer style={styles.drawer} docked={false} open={this.state.addDrawerOpen}
                        onRequestChange={this.handleAddCompDrawerRequestChange.bind(this)}>

                    <div style={styles.title}>Add</div>
                    <Divider />

                    {WidgetList.map((item, index) => (
                    <MenuItem
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

                    {this.props.entity.deviceDashboard.map((item, index) => (
                    <MenuItem
                        value={index}
                        rightIcon={<ContentClear />}
                        onTouchTap={this.handleDelCompDrawerSelected.bind(this , index)}
                        style={styles.menu}
                    >
                        {item.title}
                    </MenuItem>
                        ))}
                </Drawer>
            </div>
        )
    }
}

DeviceDashboard.propTypes = {
    loading: PropTypes.bool,
    entity: PropTypes.object,
    entityExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
};