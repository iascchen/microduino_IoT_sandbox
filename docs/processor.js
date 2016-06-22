/**
 * Created by chenhao on 16/5/31.
 */

Meteor.startup(
    function () {
        var initializing = true;
        Collections.DataMessages.find().observeChanges({
            added: function (id, entity) {
                if (!initializing) {
                    // console.log("DataMessageAdded: ", entity);

                    var datas = JSON.parse(entity.data_message);

                    //var device = Collections.Collection_Devices.findOne({_id: entity.device_id});
                    //if (!device)
                    //    return;
                    //
                    //var data_points = Collections.Collection_Projects.findOne({_id: device.project_id}).data_points;
                    //if (!data_points)
                    //    return;
                    //
                    //var _event;
                    //for (var prop in datas) {
                    //    // console.log("datas[prop]: ", prop, datas[prop]);
                    //    var data_name = prop;
                    //
                    //    var data_value = datas[data_name];
                    //    if ((typeof data_value) === 'object') {
                    //        data_value = JSON.stringify(data_value);
                    //    }
                    //
                    //    console.log("data_value", data_name, data_value);
                    //
                    //    var data_point = _.filter(data_points, function (point) {
                    //        return point.data_name == data_name;
                    //    });
                    //    // console.log("data_point", data_name, data_point);
                    //
                    //    if (!data_point || data_point.length == 0)
                    //        continue;
                    //    //console.log("data_point", data_point);
                    //
                    //    var dp = data_point[0];
                    //    // console.log("data_point", dp, DATA_POINTS[dp.data_type]);
                    //
                    //    _event = {
                    //        device_id: entity.device_id,
                    //        data_name: data_name,
                    //        data_value: data_value,
                    //        data_submit_time: entity.data_submit_time,
                    //        owner_user_id: entity.owner_user_id,
                    //    };
                    //    // console.log("event ", _event);
                    //
                    //    if (entity.sid) {
                    //        _.extend(_event, {
                    //            sid: entity.sid,
                    //        });
                    //    }
                    //
                    //    _.extend(_event, {
                    //        data_type: dp.data_type,
                    //        data_show_list: dp.data_show_list
                    //    });
                    //
                    //    var data_unit = DATA_POINTS[dp.data_type].unit;
                    //    if (data_unit) {
                    //        _.extend(_event, {data_unit: data_unit});
                    //    }
                    //
                    //    Collections.DataEvents.insert(_event);
                    //}

                    //////////////////////////////////
                    //// send to Azure Event Hubs

                    if (AZURE_ENABLE) {
                        var message = _.extend(datas, {
                            device_id: entity.device_id
                        });
                        send_to_event_hub(message);
                    }
                }
            }
        });