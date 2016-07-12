import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const styles = {
	container: {
		paddingTop: '64px',
		position: 'relative',
	},
	appbar: {
		position: 'fixed',
		left: '0',
		top: '0',
		zIndex: '1201',
	},
};

export default class DefaultLayout extends React.Component {
	componentWillMount() {
		this.$title = $('head>title');
		if (!this.$title.length) {
			this.$title = $('<title>').appendTo('head');
			this.$title.createdByMe = true;
		}
		this.beforePropsUpdate(this.props);
	}

	componentWillUnmount() {
		if (this.$title.createdByMe) {
			this.$title.remove();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.beforePropsUpdate(nextProps);
	}
	
	beforePropsUpdate(props) {
		if (!Array.isArray(props.children)) {
			throw new Error('can not render only one element in default-layout');
		}

		if (props.title) {
			this.$title.text(props.title);
		} else {
			this.$title.text('Untitled Document');
		}
	}

	onSubBarToggle(isRight, isOpen, newButton, isPin) {
		this.setState({
			[isRight ? 'rightButton' : 'leftButton']: newButton,
			[isRight ? 'rightOpened' : 'leftOpened']: isOpen,
			[isRight ? 'rightPined' : 'leftPined']: isPin,
		});
	}

	getChildContext() {
		return {
			onBarToggle: this.onSubBarToggle.bind(this)
		};
	}
	
	render() {
		const buttons = {};
		const style = {
			margin: '8px',
			position: 'relative'
		};
		if (this.state) {
			if (this.state.leftButton) {
				buttons.iconElementLeft = this.state.leftButton;
			}
			if (this.state.rightButton) {
				buttons.iconElementRight = this.state.rightButton;
			}
			if (this.state.leftPined && this.state.leftOpened) {
				style.marginLeft = `${256 + 8}px`;
			}
			if (this.state.rightPined && this.state.rightOpened) {
				style.marginRight = `${256 + 8}px`;
			}
		}
		return (
			<MuiThemeProvider>
				<div id={this.props.id} style={styles.container} className={`container ${this.props.className}`}>
					<AppBar
						title={this.props.title || 'Rule Engine'}
						style={styles.appbar}
						{...buttons}
					/>
					<div id={`${this.props.id || 'Main'}Container`} style={style}>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

DefaultLayout.propTypes = {
	children: React.PropTypes.node.isRequired,
	title: React.PropTypes.string,
	className: React.PropTypes.string,
	id: React.PropTypes.string,
};

DefaultLayout.childContextTypes = {
	onBarToggle: React.PropTypes.func
};

class Bar extends React.Component {
	constructor(props, b, c) {
		super(props, b, c);
		this.state = {
			open: false,
		};
	}

	componentWillMount() {
		const props = this.props;
		this.setOpen(props.hasOwnProperty('open') ? props.open : true, true);
	}

	setOpen(isOpen, firstTime) {
		if (this.props.pin) {
			isOpen = true;
		}

		const prevOpen = this.state && this.state.open;
		if (!firstTime && !this.props.pin && isOpen === prevOpen) {
			return;
		}

		let button;
		if (this.props.pin) {
			button = (<span></span>);
		} else if (isOpen) {
			button = this._buttonOpened || (this._buttonOpened = this.buttonOpened);
		} else {
			button = this._buttonClosed || (this._buttonClosed = this.buttonClosed);
		}
		this.setState({ open: isOpen });
		this.context.onBarToggle(this.openSecondary, isOpen, button, this.props.pin);
	}

	render() {
		let { button, docked, containerStyle, openSecondary, open, ...otherProps } = this.props;

		if (!containerStyle) {
			containerStyle = { top: '64px', bottom: '0', height: 'auto' };
		} else if (containerStyle.top !== '64px') {
			containerStyle.top = '64px';
			containerStyle.bottom = '0';
			containerStyle.height = 'auto';
		}

		if (docked || docked === undefined) {
			containerStyle.zIndex = '1199';
		}

		return (
			<Drawer
				docked={docked}
				containerStyle={containerStyle}
				openSecondary={this.openSecondary}
				open={this.state.open}
				{...otherProps}/>
		)
	}

	toggle() {
		this.setOpen(!this.state.open);
	}

	getIcon() {
		debugger;
	}
}
Bar.propTypes = _.extend({}, Drawer.propTypes, {
	pin: React.PropTypes.bool
});
Bar.contextTypes = {
	onBarToggle: React.PropTypes.func
};

export class LeftBar extends Bar {
	get openSecondary() {
		return false;
	}

	get buttonOpened() {
		return (<IconButton onClick={this.toggle.bind(this)}><NavigationClose /></IconButton>);
	}

	get buttonClosed() {
		return (<IconButton onClick={this.toggle.bind(this)}><NavigationApps /></IconButton>);
	}
}

export class RightBar extends Bar {
	get openSecondary() {
		return true;
	}

	get buttonOpened() {
		return (<IconButton onClick={this.toggle.bind(this)}><NavigationClose /></IconButton>);
	}

	get buttonClosed() {
		return (<IconButton onClick={this.toggle.bind(this)}><MoreVertIcon /></IconButton>);
	}
}
