import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addIncome } from '../../actions/profileActions';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';

class IncomeDialog extends Component {
	state = {
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

	handleAddIncome = (e) => {
		e.preventDefault();

		const newTransaction = {
			amount: this.state.amount,
			UserId: this.props.auth.user.id
		};

		this.setState({
			amount: ''
		});
		this.props.addIncome(newTransaction);
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
					<DialogTitle id="form-dialog-title">Add Income</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
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
						<Button onClick={this.handleAddIncome}>Submit</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

IncomeDialog.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addIncome: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, { addIncome })(IncomeDialog);
