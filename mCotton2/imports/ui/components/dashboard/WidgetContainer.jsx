/**
 * Created by chenhao on 16/6/22.
 */

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';

import C_Devices from '../../../../lib/collections/Devices';
import C_Widgets from '../../../../lib/collections/Widgets';

import DeviceDashboard from './DeviceDashboard';
import {WidgetList, getSubComponent } from '../widgets/WidgetList';

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

class MWidget extends Component {
    render() {
        if (this.props.loading) {
            return (<CircularProgress />);
        }

        return getSubComponent(this.props);
    }
}

MWidget.propTypes = {
    title: PropTypes.string,

    widget: PropTypes.object.isRequired,
    device: PropTypes.object.isRequired,
    datas: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default WidgetContainer = createContainer(({ params }) => {
    return params;
}, MWidget);