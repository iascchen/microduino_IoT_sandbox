import React from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import DeviceList from './device-list';

const styles = {
	outerScroller: {
		position: 'absolute',
		width: '100%',
		top: '0',
		left: '0',
		height: '100%',
		overflow: 'scroll',
	},
	searchBar: {
		// position: 'fixed',
		top: '0',
		background: 'white',
	},
	container: {
		// paddingTop: '75px',
		display: 'flex',
		flexDirection: 'column',
	},
	listParent: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column'
	},
};

export default class SearchDevice extends React.Component {
	constructor(a, b, c) {
		super(a, b, c);
		this.state = {
			filter: ''
		};
	}
	
	render() {
		return (
			<div style={styles.outerScroller}>
				<div style={styles.container}>
					<Subheader style={styles.searchBar}>
						<TextField
							floatingLabelText="查找设备"
							hintText="输入设备的名称"
							floatingLabelFixed={true}
							fullWidth={true}
							disabled={false}
						/>
					</Subheader>
					<List style={styles.listParent}>
						<Subheader>你的设备</Subheader>
						<DeviceList key="your" filter={this.state.filter} {...this.props}/>
					</List>
					<Divider/>
					<List style={styles.listParent}>
						<Subheader>公共设备</Subheader>
						<DeviceList key="public" filter={this.state.filter} {...this.props}/>
					</List>
				</div>
			</div>
		);
	}
}
