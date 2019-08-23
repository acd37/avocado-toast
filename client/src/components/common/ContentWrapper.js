import React, { Component } from 'react';
import PrivateRoute from './PrivateRoute';
import DashboardContent from '../DashboardContent';
import SettingsContent from '../SettingsContent';
import TransactionsContent from '../TransactionsContent';

class ContentWrapper extends Component {
	render() {
		return (
			<div>
				{/* <PrivateRoute path="/dashboard" component={DashboardContent} /> */}
				<PrivateRoute path="/dashboard/settings" component={SettingsContent} />
				<PrivateRoute path="/transactions" component={TransactionsContent} />
			</div>
		);
	}
}

export default ContentWrapper;
