import React from 'react';

import Divider from 'material-ui/Divider';

import DatasContainer from '../container/DatasContainer';
import ControlsContainer from '../container/ControlsContainer';
import EventsContainer from '../container/EventsContainer';

const DataConsole = ({content}) => (
    <div >
        <ControlsContainer />
        <Divider />
        <EventsContainer />
        <Divider />
        <DatasContainer />
    </div>
);

export default DataConsole;