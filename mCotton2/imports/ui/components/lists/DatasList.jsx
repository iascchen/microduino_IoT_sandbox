import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const style = { margin: 3 };

export default class DatasList extends Component {
    render() {
        if(this.props.loading){
            return (<CircularProgress />);
        }

        return (
            <List>
                <Divider/>
                <Subheader>{this.props.title} : {this.props.entitiesCount}</Subheader>
                <Divider inset={true}/>
                {this.props.entities.map((msg) => (
                <ListItem style={style} key={msg._id}
                          primaryText={msg.deviceId + " , " + msg.createAt}
                          secondaryText={JSON.stringify(msg.payload)}
                          leftAvatar={<Avatar backgroundColor={this.props.iconColor} >{this.props.iconText}</Avatar>}
                >
                </ListItem>
                    ))}
            </List>
        )
    }
}

DatasList.propTypes = {
    title: PropTypes.string,
    iconColor: PropTypes.string,
    iconText: PropTypes.string,

    loading: PropTypes.bool.isRequired,
    entities: PropTypes.array.isRequired,
    entitiesCount: PropTypes.number.isRequired,
};