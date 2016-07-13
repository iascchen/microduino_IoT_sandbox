import React from 'react';
import DefaultLayout from '../components/default-layout';

export default class NotFound extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div>
					Error: 404 not found
				</div>
			</DefaultLayout>
		);
	}
}
