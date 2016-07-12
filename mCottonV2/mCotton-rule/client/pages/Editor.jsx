import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

import DefaultLayout, {LeftBar, RightBar} from '../components/default-layout';
import {shimInput, shimDevice, deviceHasIO} from '../../imports/ruleEngine/shimInput';
import RuleDefine from '../../imports/ruleEngine/RuleDefine';
import Rules from '../../imports/ruleEngine/rules';
import ServerDataComponent from '../lib/server-data-component';

import SearchDevice from '../components/search-device';
import DeviceDetail from '../components/device-detail';
import HScroll from '../components/horizontal-scroll';
import RuleConfigMenu from '../components/rule-config-menu';
import RuleBodyEditor from '../components/rule-body-editor';

const styles = {
	HScroll: {
		padding: '10px',
		display: 'block',
		whiteSpace: 'nowrap',
	},
};

export default class Editor extends ServerDataComponent {
	constructor(props, b, c) {
		super(props, b, c);
		
		this.state = {
			alert: '',
			hoverItem: {},
		};
	}
	
	onDeviceActive(device, event) {
		if (this.currentRule.isUsingDevice(device._id)) {
			return; // already added
		}
		
		if (!device.deviceProfile) {
			this.setState({ deviceDetail: undefined });
			return this.showAlert('这个模块没有输入或输出');
		}
		this.closeAlert();
		
		if (!deviceHasIO(device)) {
			this.setState({ deviceDetail: undefined });
			return this.showAlert('这个模块没有输入或输出');
		}
		
		this.currentRule.useDevice(device._id);
	}
	
	showAlert(alert) {
		this.setState({ alert: alert, });
	}
	
	closeAlert() {
		this.setState({ alert: '', });
	}
	
	onUseData(deviceId, data) {
		console.clear();
		console.log('onUseData: %s - %o', deviceId, data);
		this.currentRule.pushData(deviceId, data);
	}
	
	onUseControl(deviceId, data) {
		console.clear();
		console.log('onUseControl: %s - %o', deviceId, data);
		this.currentRule.pushControl(deviceId, data);
	}
	
	onHoverObject(hoverItem/*deviceId, type, name*/) {
		this.setState({
			hoverItem: {
				deviceId: hoverItem[0],
				type: hoverItem[1],
				name: hoverItem[2],
			},
		});
	}
	
	getServerData() {
		if (this.currentRule) {
			this.currentRule.offUpdate();
			this.currentRule = null;
		}

		if (this.props.params.ruleId) {
			return new Promise((resolve, reject) => {
				Meteor.call('deviceRule.get', this.props.params.ruleId, (error, ret) => {
					if (ret) {
						console.info('got rule content from server: ', ret);
						this.currentRule = new RuleDefine(ret);
						resolve(ret);
					} else {
						console.error('get rule content from server: error# %O', error);
						reject(error);
					}
				});
			});
		} else {
			this.currentRule = new RuleDefine;
			this.currentRule.addRuleBody(new Rules.MegaRule);
		}
		if (this.currentRule) {
			this.currentRule.onUpdate(this.forceUpdate.bind(this));
		}
		console.log('get rule object: %O', this.currentRule);
		return this.currentRule;
	}
	
	renderWithData(rule) {
		if (!rule) {
			return renderEmpty();
		}
		
		// console.log('Editor refresh');
		let title = `Rule Editor - ${this.currentRule.title} (${this.props.params.ruleId || 'NEW' })`;
		return (
			<DefaultLayout title={title}>
				<LeftBar key="left" pin={true} docked={true}>
					<SearchDevice
						initSearch=""
						onDeviceActive={this.onDeviceActive.bind(this)}
						currentHoverObject={this.state.hoverItem}
					/>
				</LeftBar>
				<RightBar key="right"
				          pin={false}
				          docked={false}
				          open={false}
				>
					<RuleConfigMenu
						rule={this.currentRule}
						ruleId={this.props.params.ruleId}
						onMessage={this.showAlert.bind(this)}
						currentHoverObject={this.state.hoverItem}
					/>
				</RightBar>
				
				<HScroll key="deviceDetails" visable={this.currentRule.isUsingAnyDevice()} style={styles.HScroll}>
					{this.currentRule.mapDevice((deviceId) =>
						<DeviceDetail
							deviceId={deviceId}
							onUseData={this.onUseData.bind(this)}
							onUseControl={this.onUseControl.bind(this)}
							onHoverObject={this.onHoverObject.bind(this)}
							currentHoverObject={this.state.hoverItem}
						/>
					)}
				</HScroll>
				
				<RuleBodyEditor
					key="main"
					currentHoverObject={this.state.hoverItem}
					onHoverObject={this.onHoverObject.bind(this)}
					theRule={this.currentRule}
				/>
				
				<Snackbar
					key="pop"
					open={!!this.state.alert}
					message={this.state.alert}
					action="OK"
					onRequestClose={this.closeAlert.bind(this)}
				/>
			</DefaultLayout>
		);
	}
}

function renderEmpty() {
	return (
		<DefaultLayout title="这个规则不存在，请检查链接">
			<h1>你可以：</h1>
			<RaisedButton linkButton={true} primary={true} label="返回首页" href="/"/>
		</DefaultLayout>
	);
}
