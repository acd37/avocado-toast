import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { releaseFunds } from '../../actions/profileActions';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';

class ReleaseDialog extends Component {
	state = {
		category: '',
		amount: '',
		errors: {}
	};

	static getDerivedStateFromProps(props, state) {
		if (props.errors !== state.errors) {
			return {
				errors: props.errors,
			};
		}
		return null;
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onCategoryChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(e.target);
	};

	handleReleaseFunds = (e) => {
		e.preventDefault();

		const newTransaction = {
			releaseAmount: this.state.amount,
			UserId: this.props.auth.user.id,
			CategoryId: this.props.category
		};

		this.setState({
			amount: ''
		});
		this.props.releaseFunds(newTransaction);
		this.props.handleClose();
	};

	render() {
		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.open}
					onClose={this.props.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Release Funds</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							id="name"
							label="Amount"
							type="number"
							name="amount"
							fullWidth
							onChange={this.onChange}
							value={this.state.amount}
						/>
					</DialogContent>

					{this.state.success ? <p>this.state.success </p> : ''}
					<DialogActions>
						<Button onClick={this.props.handleClose}>Cancel</Button>
						<Button onClick={this.handleReleaseFunds}>Release</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

ReleaseDialog.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	releaseFunds: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, { releaseFunds })(ReleaseDialog);
