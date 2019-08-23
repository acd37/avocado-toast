import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppDrawer from '../components/common/AppDrawer';
import PrivateRoute from '../components/common/PrivateRoute';
import OverviewContent from '../components/OverviewContent';
import SettingsContent from '../components/SettingsContent';
import TransactionsContent from '../components/TransactionsContent';
import ReportContent from '../components/ReportContent';

import { getCurrentProfile, deleteAccount } from '../actions/profileActions';
import { LinearProgress } from '@material-ui/core/';

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		marginTop: 70,
		maxWidth: '90%'
	},
	loadingWrapper: {
		margin: '30px auto',
		maxWidth: 400,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	logo: {
		height: 75,
		width: 75,
		display: 'block',
		margin: '20px auto'
	}
});

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { profile, loading } = this.props.profile;
		const { classes } = this.props;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = (
				<div className={classes.loadingWrapper}>
					<img src={require('../assets/images/logo.png')} className={classes.logo} alt="cs logo" />
					<p className={classes.loadingText}>Loading data...</p>
					<LinearProgress className={classes.progress} color="primary" />
				</div>
			);
		} else {
			dashboardContent = (
				<div className={classes.root}>
					<AppDrawer />

					<main className={classes.content}>
						<PrivateRoute exact path="/dashboard" component={OverviewContent} />
						<PrivateRoute exact path="/dashboard/settings" component={SettingsContent} />
						<PrivateRoute exact path="/dashboard/transactions" component={TransactionsContent} />
						<PrivateRoute exact path="/dashboard/reports" component={ReportContent} />
					</main>
				</div>
			);
		}

		return <div>{dashboardContent}</div>;
	}
}

const mapStateToProps = (state) => ({
	user: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(withStyles(styles)(Dashboard));
