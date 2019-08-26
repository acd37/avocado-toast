import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createTransaction } from '../../actions/profileActions';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core/';


class TransactionDialog extends Component {
	state = {
		category: '',
		amount: '',
		description: '',
		success: '',
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

	handleSubmitTransaction = (e) => {
		e.preventDefault();

		const newTransaction = {
			description: this.state.description,
			amount: this.state.amount,
			CategoryId: this.state.category,
			UserId: this.props.auth.user.id
		};
		this.setState({
			description: '',
			amount: ''
		});
		this.props.createTransaction(newTransaction);
		this.props.handleClose();
	};

	render() {
		const { Categories } = this.props.profile.profile;
		return (
			<div>
				<Dialog
					fullWidth
					open={this.props.open}
					onClose={this.props.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Description"
							type="text"
							name="description"
							fullWidth
							onChange={this.onChange}
							value={this.state.description}
						/>
						<FormControl fullWidth>
							<InputLabel htmlFor="category">Category</InputLabel>
							<Select value={this.state.category} onChange={this.onCategoryChange} name="category">
								{Categories.map((category) => (
									<MenuItem key={category.category_id} value={category.category_id}>
										{category.description}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
						<Button onClick={this.handleSubmitTransaction}>Submit</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}


TransactionDialog.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	categories: PropTypes.object.isRequired,
	createTransaction: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, { createTransaction })(TransactionDialog);
