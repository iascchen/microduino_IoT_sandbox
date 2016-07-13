import React from 'react';
import {ListItem} from 'material-ui/List';
import ServerDataComponent from '../lib/server-data-component';

export default class DeviceList extends ServerDataComponent {
	getServerData() {
		this.subscribe('search_devices');
		return Meteor.getBackCollection('devices').find()
	}

	onClick(device, event) {
		if (!this.props.onDeviceActive) {
			throw new Error('DeviceList: no `showDeviceDetail` prop.');
		}
		this.props.onDeviceActive(device, event);
	}

	renderWithData(devices) {
		return (
			<div>
				{devices.map((item) => {
					let style;
					if (this.props.currentHoverObject.deviceId === item._id) {
						style = {
							background: '#eee'
						};
					}

					return (
						<ListItem
							key={item._id}
							primaryText={item.name}
							secondaryText={item.desc}
							style={style}
							onDoubleClick={this.onClick.bind(this,item)}
						/>
					);
				})}
			</div>
		)
	}
}
