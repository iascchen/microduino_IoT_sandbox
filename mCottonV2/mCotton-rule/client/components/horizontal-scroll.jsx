import React from 'react';

const styles = {
	overflowX: 'scroll',
	overflowY: 'visable',
	verticalAlign: 'top',
};

export default class HScroll extends React.Component {
	render() {
		if (this.props.visable) {
			const { visable, style, ...props } = this.props;
			return (
				<div {...props} style={_.extend(styles, style)}></div>
			);
		} else {
			return null;
		}
	}
}

HScroll.propTypes = {
	visable: React.PropTypes.bool.isRequired,
};
