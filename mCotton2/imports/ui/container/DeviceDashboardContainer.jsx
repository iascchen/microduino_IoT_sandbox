/**
 * Created by chenhao on 16/6/22.
 */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import C_Devices from '../../../lib/collections/Devices';
import C_MessageDatas from '../../../lib/collections/MessageDatas';

import DeviceDashboard from '../components/dashboard/DeviceDashboard';

export default DeviceDashboardContainer = createContainer(({ params }) => {
    const { id } = params;
    //console.log('DeviceDashboardContainer' , id, params);

    const handle = Meteor.subscribe('device', id);
    const deviceLoading = !handle.ready();

    const device = C_Devices.findOne({ _id: id });
    const deviceExists = !deviceLoading && !!device;

    const dataHandle = Meteor.subscribe('device_datas', id, 5);
    const dataLoading = !dataHandle.ready();

    const datas = C_MessageDatas.find({ deviceId: id }, { sort: { createAt: -1 } }).fetch();

    return {
        deviceLoading,
        device,
        deviceExists,

        dataLoading,
        datas,
    };
}, DeviceDashboard);