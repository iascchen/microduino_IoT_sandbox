import React from 'react';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {blue300, green300, orange300, indigo900, deepOrange500} from 'material-ui/styles/colors';

import ServerDataComponent from '../lib/server-data-component';
import {shimInput, shimDevice, deviceHasIO} from '../../imports/ruleEngine/shimInput';
import {chipStyle, chipText} from '../lib/chipStyle';

const styles = {
	container: {
		verticalAlign: 'top',
		display: 'inline-block',
		maxWidth: '240px',
		overflow: 'hidden',
		marginRight: '5px',
	},
	header: {
		width: '100%',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		padding: '0',
	},
	text: {
		padding: '4px',
		whiteSpace: 'normal',
	},
	chipData: _.extend(chipStyle, {}),
	chipControl: _.extend(chipStyle, {}),
	chipText: chipText,
};

export default class DeviceDetail extends ServerDataComponent {
	constructor(a, b, c) {
		super(a, b, c);
		if (!this.props.onHoverObject) {
			this.onHover = (hover, type, object) => {
				console.log('DeviceDetail.onHover ', hover, type, object);
			};
		}
		this.hoverStack = [];
	}
	
	onHover(hover, type, object) {
		const hObj = [this.props.deviceId, type, object.name];
		if (hover) {
			this.hoverStack.unshift(hObj);
			this.props.onHoverObject(hObj);
		} else {
			this.hoverStack.shift();
			this.props.onHoverObject(this.hoverStack[0] || []);
		}
	}
	
	onActive(type, object) {
		if (type === 'control' && this.props.onUseControl) {
			this.props.onUseControl(this.props.deviceId, object);
		}
		if (type === 'data' && this.props.onUseData) {
			this.props.onUseData(this.props.deviceId, object);
		}
	}
	
	getServerData() {
		this.subscribe('search_devices');
		return Meteor.getBackCollection('devices').findOne(this.props.deviceId)
	}
	
	renderWithData(item) {
		const { deviceId } = this.props;
		let style;
		
		const { datas, controls } = shimDevice(item);

		let isHoverThis;

		if (this.props.currentHoverObject.deviceId === deviceId) {
			style = {
				background: '#eee'
			};
			isHoverThis = (name, type, current) => {
				return current.type === type && current.name === name;
			};
		} else {
			isHoverThis = (name, type, current) => {
				return false;
			};
		}
		
		return (
			<Card style={styles.container} key={deviceId}
			      onMouseEnter={this.onHover.bind(this,true,'device',item)}
			      onMouseLeave={this.onHover.bind(this,false,'device',item)}
			>
				<CardHeader
					textStyle={styles.header}
					title={item.name}
					subtitle={item.desc}
					style={style}
				/>
				{datas.length === 0 ? null :
					<CardText key="data" style={styles.text}>
						{datas.map((data) =>
							<Chip
								key={data.name}
								style={styles.chipData}
								labelStyle={styles.chipText}
								backgroundColor={green300}
								onMouseEnter={this.onHover.bind(this,true,'data',data)}
								onMouseLeave={this.onHover.bind(this,false,'data',data)}
								onDoubleClick={this.onActive.bind(this,'data',data)}
							>
								<Avatar
									size={32}
									color={blue300}
									backgroundColor={isHoverThis(data.name, 'data', this.props.currentHoverObject)? deepOrange500: indigo900}
								>D</Avatar>
								{data.name}
							</Chip>
						)}
					</CardText>
				}
				{controls.length === 0 ? null :
					<CardText key="control" style={styles.text}>
						{controls.map((control) =>
							<Chip
								key={control.name}
								style={styles.chipControl}
								labelStyle={styles.chipText}
								backgroundColor={orange300}
								onMouseEnter={this.onHover.bind(this,true,'control',control)}
								onMouseLeave={this.onHover.bind(this,false,'control',control)}
								onDoubleClick={this.onActive.bind(this,'control',control)}
							>
								<Avatar
									size={32}
									color={blue300}
									backgroundColor={isHoverThis(control.name, 'control', this.props.currentHoverObject)? deepOrange500: indigo900}
								>C</Avatar>
								{control.name}
							</Chip>
						)}
					</CardText>
				}
			</Card>
		);
	}
}

DeviceDetail.propTypes = {
	deviceId: React.PropTypes.string.isRequired,
};
