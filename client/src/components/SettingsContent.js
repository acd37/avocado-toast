import React, { Component } from 'react';
import Header from './common/Header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { deleteAccount, updateUserProfile, updateUserPassword } from '../actions/profileActions';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		width: 500,
		maxWidth: '90%'
	},
	passwordContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		width: 300,
		maxWidth: '90%'
	},
	deleteAccount: {
		marginTop: 80,
		marginBottom: 30
	},
	warningText: {
		fontSize: '0.8rem',
		color: '#cc0000'
	},
	successText: {
		fontSize: '0.8rem',
		color: '#008e00'
	}
});

class SettingsContent extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: ''
	};

	componentDidMount() {
		this.setState({
			firstName: this.props.profile.profile.firstName,
			lastName: this.props.profile.profile.lastName,
			email: this.props.profile.profile.email,
			password: '',
			password2: ''
		});
	}

	handleDeleteAccount = () => {
		this.props.deleteAccount();
		localStorage.removeItem('budget');
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleUpdateUserProfile = (e) => {
		e.preventDefault();

		let userData = {
			id: this.props.profile.profile.id,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email
		};

		this.props.updateUserProfile(userData);
	};

	handleUpdateUserPassword = (e) => {
		e.preventDefault();

		if (this.state.password !== this.state.password2) {
			alert('Your passwords do not match.');
		} else {
			let userData = {
				id: this.props.profile.profile.id,
				password: this.state.password
			};
			this.props.updateUserPassword(userData);
		}
	};

	render() {
		const { classes, success } = this.props;
		return (
			<div>
				<Header text="Settings" />

				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<div>
						<h4> User Profile </h4>
						<form
							className={classes.container}
							noValidate
							autoComplete="off"
							onSubmit={this.handleUpdateUserProfile}
						>
							<TextField
								label="First Name"
								name="firstName"
								className={classes.textField}
								value={this.state.firstName}
								onChange={this.handleChange}
								margin="normal"
								fullWidth
							/>
							<TextField
								label="Last Name"
								name="lastName"
								className={classes.textField}
								value={this.state.lastName}
								onChange={this.handleChange}
								margin="normal"
								fullWidth
							/>
							<TextField
								label="Email"
								name="email"
								className={classes.textField}
								value={this.state.email}
								onChange={this.handleChange}
								margin="normal"
								fullWidth
							/>

							<Button type="submit"> Update Profile</Button>
						</form>
						{success.message && <p className={classes.successText}>{success.message.profile}</p>}
					</div>
					<div>
						<h4> Reset Password</h4>
						<form
							className={classes.passwordContainer}
							noValidate
							autoComplete="off"
							onSubmit={this.handleUpdateUserPassword}
						>
							<TextField
								label="Password"
								type="password"
								name="password"
								autoComplete="new-password"
								className={classes.textField}
								value={this.state.password}
								onChange={this.handleChange}
								margin="normal"
								fullWidth
							/>
							<TextField
								label="Retype Password"
								type="password"
								autoComplete="new-password"
								name="password2"
								className={classes.textField}
								value={this.state.password2}
								onChange={this.handleChange}
								margin="normal"
								fullWidth
							/>
							<Button type="submit"> Update Profile</Button>
						</form>
						{success.message && <p className={classes.successText}>{success.message.password}</p>}
					</div>
				</div>

				<div className={classes.deleteAccount}>
					<h4> Delete Your Account </h4>
					<Button onClick={this.handleDeleteAccount}> Delete Account </Button>
					<p className={classes.warningText}>
						<strong>Warning:</strong> Deleting your account is permanent, and cannot be undone. You will
						need to sign up for a new account if you'd like to come back to AvocadoToast
					</p>
				</div>
			</div>
		);
	}
}

SettingsContent.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	updateUserProfile: PropTypes.func.isRequired,
	updateUserPassword: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
	auth: state.auth,
	loading: state.auth.loading,
	profile: state.profile,
	success: state.success
});

export default connect(mapStateToProps, { deleteAccount, updateUserProfile, updateUserPassword })(
	withStyles(styles)(SettingsContent)
);
