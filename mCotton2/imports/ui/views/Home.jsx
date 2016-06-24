import React, { Component, PropTypes } from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import SwipeableViews from 'react-swipeable-views';

import DataConsole from '../../ui/views/DataConsole';
import DevicesContainer from '../../ui/container/DevicesContainer';
import Affix from '../components/affix';

const tilesData = [
    {
        name: 'House',
        url: '/house'
    }, {
        name: 'Data Console',
        url: '/console'
    }, {
        name: 'Device Dashboard',
        url: '/dashboard/GguhoR9Z2mxDndeDc'
    }
];

const tilesData2 = [
    {
        name: 'Projects',
        url: '/projects'
    }, {
        name: 'Devices',
        url: '/devices'
    }, {
        name: 'Events',
        url: '/msgevents'
    }, {
        name: 'Datas',
        url: '/msgdatas'
    }, {
        name: 'Controls',
        url: '/msgcontrols'
    }, {
        name: 'Device Field Selector',
        url: '/widget_setting'
    },
];

const tilesData3 = [
    {
        name: 'Lifecycle',
        url: '/lifecycle'
    }, {
        name: 'Destroy',
        url: '/destroy'
    }, {
        name: 'Selector',
        url: '/selector'
    }, {
        name: 'MCanvas',
        url: '/widgets/'
    }, {
        name: 'MLed',
        url: '/widgets/m_led'
    }, {
        name: 'MOutput',
        url: '/widgets/m_output'
    }, {
        name: 'MButton',
        url: '/widgets/m_button'
    }, {
        name: 'MToggle',
        url: '/widgets/m_toggle'
    }, {
        name: 'MInput',
        url: '/widgets/m_input'
    }, {
        name: 'MTerminal',
        url: '/widgets/m_terminal'
    }, {
        name: 'MSlider',
        url: '/widgets/m_slider'
    }, {
        name: 'MRangeSlider',
        url: '/widgets/m_range_slider'
    }, {
        name: 'MColor',
        url: '/widgets/m_color'
    }, {
        name: 'MColor Chrome',
        url: '/widgets/m_color_chrome'
    }, {
        name: 'MSelector',
        url: '/widgets/m_selector'
    }, {
        name: 'MTime',
        url: '/widgets/m_time'
    },
];


const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    };

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <div>
                <Affix offset={64}>
                    <Tabs
                        onChange={this.handleChange.bind(this)}
                        value={this.state.slideIndex}
                    >
                        <Tab label="House Status" value={0}/>
                        <Tab label="Devices" value={1}/>
                        <Tab label="Discover" value={2}/>
                    </Tabs>
                </Affix>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange.bind(this)}
                >
                    <div style={styles.slide}>
                        <DataConsole />
                    </div>
                    <div style={styles.slide}>
                        <DevicesContainer />
                    </div>
                    <div style={styles.slide}>
                        <ProjectsContainer />
                    </div>
                </SwipeableViews>
            </div>
        )
    };
};
