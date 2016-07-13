import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import NoteAddAction from 'material-ui/svg-icons/action/note-add';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';

import DefaultLayout from '../components/default-layout';
import ServerDataComponent from '../lib/server-data-component';

class Dashboard extends ServerDataComponent {
	getServerData() {
		return Meteor.callAsync('deviceRule.list');
	}
	
	renderWithData(list) {
		return (
			<DefaultLayout>
				<div>
					<RaisedButton
						label="Create Rule"
						primary={true}
						icon={<NoteAddAction />}
						onClick={() => this.props.router.push('/editor')}
					/>
				</div>
				<div style={{margin:'20px'}}>
					<Divider/>
				</div>
				<Paper zDepth={2}>
					<Table
						fixedHeader={true}
						selectable={false}
					>
						<TableHeader
							displaySelectAll={false}
							adjustForCheckbox={false}
							enableSelectAll={false}
						>
							<TableRow>
								<TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
									<h1>Rule List</h1>
								</TableHeaderColumn>
							</TableRow>
							<TableRow>
								<TableHeaderColumn>#</TableHeaderColumn>
								<TableHeaderColumn>title</TableHeaderColumn>
								<TableHeaderColumn>enabled</TableHeaderColumn>
								<TableHeaderColumn>edit</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody
							displayRowCheckbox={false}
							showRowHover={true}
						>
							{list.map((rule, index) => (
								<TableRow key={index}>
									<TableRowColumn>{index}</TableRowColumn>
									<TableRowColumn>{rule.title}</TableRowColumn>
									<TableRowColumn>{rule.enabled ? 'YES' : 'NO'}</TableRowColumn>
									<TableRowColumn>
										<RaisedButton
											primary={true}
											icon={<EditorModeEdit />}
											onClick={() => this.props.router.push(`/editor/${rule._id}`)}
										/>
									</TableRowColumn>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</DefaultLayout>
		);
	}
}

export default withRouter(Dashboard);
