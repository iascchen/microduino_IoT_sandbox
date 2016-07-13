import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
	normalStyle: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
		flex: 1,
	},
	loader: {
		display: 'inline-block',
		position: 'relative',
	},
};
styles.absoluteStyle = _.extend({
	position: 'absolute',
	left: '0',
	width: '100%',
	top: '0',
	height: '100%',
}, styles.normalStyle);

export default class ServerDataComponent extends React.Component {
	constructor(a, b, c) {
		if (new.target === ServerDataComponent) {
			throw new TypeError("Cannot construct abstract class `ServerDataComponent` instances directly");
		}
		super(a, b, c);
		this.state = {
			loading: true,
			error: false,
			_data: false
		};
		this.allSubsReady = true;

		this._subscribes = {};
		this._observing = [];
	}

	componentWillUnmount() {
		Object.keys(this._subscribes).forEach((subName) => {
			this._subscribes[subName].stop();
		});
		this._unloadObserve();
	}

	_unloadObserve() {
		this._observing.forEach((observe) => {
			if (observe) {
				observe.stop();
			}
		});
		this._observing.length = 0;
	}

	componentWillMount() {
		this.inInitProcess = true;
		try {
			this.reload();
		} catch (e) {
			debugger;
		}
		this.inInitProcess = false;
	}

	/**
	 * 子类调用，调用后会刷新数据（重新从服务器请求）
	 */
	reload() {
		let result = this.getServerData();
		let waitting = 0;

		if (!Array.isArray(result)) {
			result = [result];
		}

		const testWaitting = () => {
			waitting--;
			if (waitting <= 0) {
				this.setState({
					loading: false,
				});
			}
		};

		result.forEach((item, index) => {
			if (item && item.then) {
				result[index] = undefined;
				waitting++;
				item.then((thisData) => {
					result[index] = thisData;
					this.setState({
						_data: result,
					});
					testWaitting();
				}, (error) => {
					this.setState({
						error: error,
						loading: false,
					});

					waitting--;
				});
			}
		});

		if (this.allSubsReady) {
			console.log('reload: all subs ready, getting data');
			this._unloadObserve();

			result = result.map((item, index) => {
				if (item instanceof Meteor.Collection.Cursor) {
					let initializing = true;
					const changeHandler = () => {
						if (initializing) {
							return;
						}

						result[index] = item.fetch();
						this.setState({
							_data: result,
						});
					};
					const handle = item.observeChanges({
						added: changeHandler,
						changed: changeHandler,
						removed: changeHandler,
					});
					initializing = false;
					this._observing.push(handle);

					return item.fetch();
				} else {
					return item;
				}
			});
		}
		this.setState({
			error: false,
			loading: waitting > 0 || !this.allSubsReady,
			_data: result,
		});
	}

	subscribe(...args) {
		const name = args[0];
		if (!this.inInitProcess) {
			return;
		}
		console.log('add sub: %s', name);

		if (this.allSubsReady) {
			this.allSubsReady = false;
			try {
				this.forceUpdate();
			} catch (e) {
				console.info(e.message); // dom not ready
			}
		}

		if (this._subscribes[name]) {
			throw new Error(`duplicate subscribe: ${name}`);
		}
		let last = args.pop();

		let somethingError = false;
		const prepare = () => {
			const allOk = !somethingError || Object.keys(this._subscribes).every((subName) => {
					return this._subscribes[subName].ready();
				});
			if (allOk) {
				this.onSubsAllReady();
			}
		};

		if (typeof last !== 'function') {
			args.push(last);
			last = () => undefined;
		}

		args.push({
			onReady(){
				last();
				prepare();
			},
			onStop: (error) => {
				somethingError = !!error;
				if (somethingError) {
					this.onSubsError(name, error);
				}
			},
		});

		this._subscribes[name] = Meteor.subscribe.apply(Meteor, args);
	}

	onSubsError(name, error) {
		console.log('%cError while subscribe `%s`: %s', 'color:red', name, error.message);
		this.setState({ error: error, loading: false });
	}

	onSubsAllReady() {
		this.allSubsReady = true;
		this.reload();
	}

	render() {
		if (this.state.error) {
			return this.renderError(this.state.error);
		} else if (this.state.loading) {
			return this.renderLoading();
		} else {
			return this.renderWithData.apply(this, this.state._data);
		}
	}

	renderError(error) {
		return (
			<div>
				<div>{error.errorType || error.type}: {error.message}</div>
				<pre>{error.stack}</pre>
				{error.details}
			</div>
		);
	}

	renderLoading() {
		const style = this.props.maskLoading ? styles.absoluteStyle : styles.normalStyle;
		return (
			<div style={style}>
				<MuiThemeProvider>
					<RefreshIndicator
						size={50} left={0} top={0}
						status="loading" style={styles.loader}
					/>
				</MuiThemeProvider>
			</div>
		)
	}

	getServerData() {
		throw new TypeError('must implement abstract method `ServerDataComponent::getServerData()`');
	}

	renderWithData() {
		throw new TypeError('must implement abstract method `ServerDataComponent::renderWithData()`');
	}
}
