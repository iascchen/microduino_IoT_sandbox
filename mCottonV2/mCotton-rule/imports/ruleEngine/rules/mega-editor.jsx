import React from 'react';

const textStyles = {
	width: '100%',
	height: '100%',
};

export default class MegaRuleEditor extends React.Component {
	onChange(event) {
		this.props.body.setContent($(event.target).val());
	}
	
	render() {
		return (
			<textarea
				onBlur={this.onChange.bind(this)}
				style={textStyles}
				defaultValue={this.props.body.content}
			/>
		);
	}
}
