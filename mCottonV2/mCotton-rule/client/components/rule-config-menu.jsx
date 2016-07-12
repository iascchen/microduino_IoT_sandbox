import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {withRouter} from 'react-router'

class RuleConfigMenu extends React.Component {
	updateTextField(field, event) {
		this.props.rule[field] = $(event.target).val();
		this.props.rule.triggerUpdate();
	}
	
	save() {
		const message = this.props.onMessage || alert;
		
		const msg = this.props.rule.preSave();
		if(msg){
			return message(msg);
		}

		const ruleData = JSON.parse(JSON.stringify(this.props.rule));
		if (this.props.ruleId) {
			ruleData._id = this.props.ruleId;
		} else {
			delete ruleData._id;
		}

		Meteor.call('deviceRule.upsert', ruleData, (error, result) => {
			const savedDoc = result.doc;
			if (this.props.rule._id !== savedDoc._id) {
				if (this.props.rule._id) { // edit old one, but page already changed while saving call
					return; // drop event
				} else { // new one
					return this.props.router.push(`/editor/${savedDoc._id}`);
				}
			}
			message(result.message);
			if (result.success) {
				this.props.rule.markSaved();
			}
		});
	}
	
	render() {
		return (
			<form style={{padding:'10px'}}>
				<TextField
					hintText="规则标题"
					floatingLabelText="规则标题"
					defaultValue={this.props.rule.title}
					onChange={this.updateTextField.bind(this,'title')}
				/>
				<br/>
				
				<TextField
					hintText="规则描述"
					floatingLabelText="规则描述"
					defaultValue={this.props.rule.desc}
					onChange={this.updateTextField.bind(this,'desc')}
					multiLine={true}
					rows={2}
				/>
				<br/>
				
				<div style={{textAlign:'right'}}>
					<RaisedButton primary={true} label="保存当前规则定义" onClick={this.save.bind(this)}/>
					<br/>
				</div>
				
				<br/>
				<div style={{textAlign:'right'}}>
					<RaisedButton secondary={true} label="关闭（返回首页）"/>
					<br/>
				</div>
				<hr/>
				<div>DEBUG:</div>
				<pre>{JSON.stringify(this.props.rule, null, 4)}</pre>
				<pre style={{minHeight:'10em'}}>{JSON.stringify(this.props.currentHoverObject, null, 4)}</pre>
			</form>
		)
	}
}

export default withRouter(RuleConfigMenu);
