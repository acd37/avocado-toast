import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core/';
import PrivateRoute from './components/common/PrivateRoute';
import { setCurrentUser, logoutUser } from './actions/authActions';

// State Management
import store from './store';
import { Route, Switch, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

const styles = {
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
	},
	progress: {
		width: 250,
		display: 'block',
		margin: '20px auto'
	},
	loadingText: {
		textAlign: 'center',
		color: '#5e5e5e',
		fontWeight: 300,
		fontSize: '1.3rem'
	}
};

// Persistent Login
if (localStorage.budget) {
	setAuthToken(localStorage.budget);

	const decoded = jwtDecode(localStorage.budget);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/';
	}
}

class App extends Component {
	render() {
		const { loading } = this.props.loading;

		return (
			<div className="App">
				<div className="application">
					{loading ? (
						<div style={styles.loadingWrapper}>
							<img src={require('./assets/images/logo.png')} style={styles.logo} alt="cs logo" />
							<p style={styles.loadingText}>Loading data...</p>
							<LinearProgress style={styles.progress} color="primary" />
						</div>
					) : (
						<div>
							<Route exact path="/" component={Login} />
							<Route exact path="/register" component={Register} />
							<Switch>
								<PrivateRoute path="/dashboard" component={Dashboard} />
							</Switch>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	loading: state.loading
});

export default connect(mapStateToProps, {})(withRouter(App));
