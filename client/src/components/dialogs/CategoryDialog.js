import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCategory } from '../../actions/profileActions';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';


class CategoryDialog extends Component {
	state = {
		description: '',
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

	handleSubmitCategory = (e) => {
		e.preventDefault();
		const newCategory = {
			description: this.state.description,
			UserId: this.props.auth.user.id
		};
		this.props.createCategory(newCategory);
		this.setState({
			description: ''
		});
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
					<DialogTitle id="form-dialog-title">Add Category</DialogTitle>
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
					</DialogContent>

					{this.state.success ? <p>this.state.success </p> : ''}
					<DialogActions>
						<Button onClick={this.props.handleClose}>Cancel</Button>
						<Button onClick={this.handleSubmitCategory}>Submit</Button>
					</DialogActions>
					{this.state.errors.categories ? this.state.errors.categories : ''}
				</Dialog>
			</div>
		);
	}
}

CategoryDialog.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	categories: PropTypes.object.isRequired,
	createCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	categories: state.categories
});

export default connect(mapStateToProps, { createCategory })(CategoryDialog);
