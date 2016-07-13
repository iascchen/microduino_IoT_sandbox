import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

class App extends React.Component {
	add() {
		let payload = (0 || eval)('x= '+localStorage.content);

		Meteor.call('fakeData', {
			id: localStorage.id,
			payload: payload
		}, (err, ret) => {
			if (err) {
				console.error(err);
			} else {
				console.log(ret);
			}
		});
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>MQTT Server</h1>
				</header>

				<div>
					MQTT Server is running on port 1883 !
				</div>

				<form id="theForm">
					<h1>insert fake data</h1>
					<div>
						<input className="input id"
						       name="id"
						       type="text"
						       placeholder="ID"
						       onChange={(event) => {localStorage.id=event.target.value}}
						       defaultValue={localStorage.id}
						/>
					</div>
					<div>
						<textarea
							style={{minWidth:'40em',minHeight:'20em'}}
							className="input content"
							name="content"
							placeholder="payload JSON"
							onChange={(event) => {localStorage.content=event.target.value}}
							defaultValue={localStorage.content}
						/>
					</div>
					<div>
						<button type="button" onClick={this.add.bind(this)}>ADD</button>
					</div>
				</form>
			</div>
		);
	}
}

Meteor.startup(() => {
	render(<App />, $('<div id="ReactRoot">').appendTo(document.body)[0]);
});
