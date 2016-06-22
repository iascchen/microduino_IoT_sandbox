import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { MessageDatas } from '../../../../lib/collections/MessageDatas';

class MessageDatasList extends Component {
    renderData(data) {
        return (
            <li key={data._id}>
                {data.createAt} , {JSON.stringify(data.payload)}
            </li>);
    }

    render() {
        return <ul>{this.props.datas.map(this.renderData)}</ul>;
    }
}

MessageDatasList.propTypes = {
    datas: PropTypes.array.isRequired,
    datasCount: PropTypes.number.isRequired,
    currentUserId: PropTypes.string.isRequired,
};

export default createContainer((params) => {
    const fieldsFilter = { deviceId: false, token: false };

    return {
        datas: MessageDatas.find({ deviceId: params.devId },
            { fields: fieldsFilter, sort: { createAt: -1 } }).fetch(),
        datasCount: MessageDatas.find({}).count(),
        currentUserId: Meteor.userId(),
    };
}, MessageDatasList);