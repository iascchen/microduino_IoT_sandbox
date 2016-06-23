/**
 * Created by chenhao on 16/6/22.
 */

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';

import C_Devices from '../../../lib/collections/Devices';
import C_Widgets from '../../../lib/collections/Widgets';

import DeviceDashboard from '../components/dashboard/DeviceDashboard';
import {WidgetList, getSubComponent } from '../components/widgets/WidgetList';

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
        if (this.props.widgetLoading) {
            return (<CircularProgress />);
        }

        return (
            <GridTile style={styles.gridTile} key={this.props.widgetIndex} cols={this.props.widget.cols}
                      rows={this.props.widget.rows}>
                {getSubComponent(this.props)}
            </GridTile>
        )
    }
}

MWidget.propTypes = {
    title: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,

    widgetIndex: PropTypes.number.isRequired,
};

export default WidgetContainer = createContainer(({ params }) => {
    const { widgetId } = params;

    const handle = Meteor.subscribe('widget', widgetId);
    const widgetLoading = !handle.ready();

    const widget = C_Widgets.findOne({ _id: widgetId });
    const widgetExists = !widgetLoading && !!widget;

    return {
        widgetLoading,
        widget,
        widgetExists,

        ...params
    };
}, MWidget);