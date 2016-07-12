import React from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {blue300, green300, orange300, deepOrange500, indigo900} from 'material-ui/styles/colors';

import getRuleEditor from '../../imports/ruleEngine/rulesEditor';
import {chipStyle, chipText} from '../lib/chipStyle';

const styles = {
	container: {
		padding: '10px 20px'
	},
	pager: {
		minHeight: '800px',
		display: 'flex',
		padding: '20px',
	},
	left: {
		flexDirection: 'column',
		display: 'flex',
	},
	center: {
		flex: '1'
	},
	right: {
		flexDirection: 'column',
		display: 'flex',
	},
	chipText: chipText,
	chip: chipStyle,
};

export default class RuleBodyEditor extends React.Component {
	constructor(a, b, c) {
		super(a, b, c);
		if (!this.props.onHoverObject) {
			this.onHover = (hover, type, object) => {
				console.log('RuleEditor.onHover ', hover, type, object);
			};
		}
		this.hoverStack = [];
	}
	
	onHover(hover, type, object) {
		const hObj = [object.deviceId, type, object.realName];
		if (hover) {
			this.hoverStack.unshift(hObj);
			this.props.onHoverObject(hObj);
		} else {
			this.hoverStack.shift();
			this.props.onHoverObject(this.hoverStack[0] || []);
		}
	}
	
	onActive(object) {
		const userName = prompt('输入变量名：', object.userName);
		if (userName === null) {
			return;
		}
		object.userName = userName;
		this.forceUpdate();
	}
	
	render() {
		if (!this.props.theRule) {
			return (
				<h1 style={{color:'red'}}>Internel Error: No Rule</h1>
			);
		}

		const isHoverThis = (type, io, current) => {
			const isHover = current.deviceId === io.deviceId &&
			                current.type === type &&
			                current.name === io.realName;
			return isHover ? deepOrange500 : indigo900;
		};
		
		return (
			<div style={styles.container}>
				<Paper style={styles.pager} zDepth={4}>
					<div key="left" style={styles.left}>
						{this.props.theRule.mapData((data) =>
							<Chip
								key={data.deviceId + data.realName}
								style={styles.chip}
								labelStyle={styles.chipText}
								backgroundColor={green300}
								onMouseEnter={this.onHover.bind(this,true,'data',data)}
								onMouseLeave={this.onHover.bind(this,false,'data',data)}
								onDoubleClick={this.onActive.bind(this,data)}
							>
								<Avatar
									size={32}
									color={blue300}
									backgroundColor={isHoverThis('data', data, this.props.currentHoverObject)}
								>D</Avatar>
								{data.displayName}
							</Chip>
						)}
					</div>
					<div key="center" style={styles.center}>
						{this.props.theRule.mapRuleBody((body) => {
							var CLS = getRuleEditor(body);
							//noinspection CheckTagEmptyBody
							return (<CLS body={body}></CLS>);
						})}
					</div>
					<div key="right" style={styles.right}>
						{this.props.theRule.mapControl((control) =>
							<Chip
								key={control.deviceId + control.realName}
								style={styles.chip}
								labelStyle={styles.chipText}
								backgroundColor={orange300}
								onMouseEnter={this.onHover.bind(this,true,'control',control)}
								onMouseLeave={this.onHover.bind(this,false,'control',control)}
								onDoubleClick={this.onActive.bind(this,control)}
							>
								<Avatar
									size={32}
									color={blue300}
									backgroundColor={isHoverThis('control', control, this.props.currentHoverObject)}
								>C</Avatar>
								{control.displayName}
							</Chip>
						)}
					</div>
				</Paper>
			</div>
		);
	}
}
