import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addIncome } from '../../actions/profileActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class IncomeDialog extends Component {
	state = {
		amount: ''
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
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

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, { addIncome })(IncomeDialog);
