/**
 * Created by chenhao on 15/4/16.
 */


////////////////////////
// AZURE Event Hub

var BSON = Npm.require('buffalo');
var https = Npm.require('https');

import { MSG_DATA } from '../../../lib/constants';

import C_Devices from '../../../lib/collections/Devices';
import C_MessageDatas from '../../../lib/collections/MessageDatas';

var create_sas_token = function (uri, key_name, key) {
    // Token expires in one hour
    var expiry = moment().add(1, 'hours').unix();

    var string_to_sign = encodeURIComponent(uri) + '\n' + expiry;
    var signature = CryptoJS.HmacSHA256(string_to_sign, key).toString();

    var rettoken = 'SharedAccessSignature sr=' + encodeURIComponent(uri)
        + '&sig=' + encodeURIComponent(signature)
        + '&se=' + expiry
        + '&skn=' + key_name;

    return rettoken;
};

var send_to_event_hub = function (jsonmsg) {
    console.log("send_to_event_hub: ", jsonmsg);

    var bsonObject = BSON.serialize(jsonmsg);

    var postheaders = {
        'Authorization': create_sas_token(Azure_SB_Uri, Azure_SB_Send_Key_Name, Azure_SB_Send_Key),
        'Content-Length': bsonObject.length,
        'Content-Type': 'application/atom+xml;type=entry;charset=utf-8',
        'Expect': '100-continue'
    };

    var optionspost = {
        host: Azure_SB_Namespace,
        port: 443,
        path: Azure_SB_Uri,
        method: 'POST',
        headers: postheaders
    };

    // Send the request
    var reqPost = https.request(optionspost, function (res) {
        //console.log("statusCode: ", res.statusCode);
        res.on('data', function (d) {
            process.stdout.write(d);
        });
    });

    // write the json data
    reqPost.write(bsonObject);
    reqPost.end();

    reqPost.on('error', function (e) {
        console.error(e);
    });
};

////////////////////////
// Init Data trigger when Meteor.startup

Meteor.startup(function () {
    const enabled = Meteor.settings.azure.enabled;
    if (!enabled) {
        return;
    }

    let initializing = true;

    let now = new Date().getTime();
    C_MessageDatas.find({
        msgType: MSG_DATA,
        createAt: { $gt: now }
    }).observeChanges({
        added: function (id, entity) {
            if (!initializing) {
                // console.log("DataMessageAdded: ", entity);

                var datas = JSON.parse(entity.payload);

                //////////////////////////////////
                //// send to Azure Event Hubs

                var message = _.extend(datas, {
                    device_id: entity.device_id
                });
                send_to_event_hub(message);
            }
        }
    });

    initializing = false;
});
