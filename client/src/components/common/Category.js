import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteCategory } from '../../actions/profileActions';
import { connect } from 'react-redux';
import ReleaseDialog from '../dialogs/ReleaseDialog';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
	categoryLine: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		border: 'none',
		padding: '0px 20px',
		marginBottom: 10,
		boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
		borderRadius: '0.375rem'
	}
};

class Category extends Component {
	state = {
		showReleaseDialog: false
	};

	handleCloseReleaseDialog = () => {
		this.setState({ showReleaseDialog: false });
	};

	handleDelete = (category) => {
		let userConfirmation = window.confirm(
			'Are you sure you want to delete the following category: ' + category.description + '?'
		);
		if (userConfirmation) {
			this.props.deleteCategory(category.category_id);
		}
	};

	render() {
		const { category } = this.props;

		return (
			<div>
				<ReleaseDialog
					handleClose={this.handleCloseReleaseDialog}
					open={this.state.showReleaseDialog}
					category={this.state.category}
				/>

				<div key={category.category_id} style={styles.categoryLine}>
					<div>
						<p>
							<Tooltip title="Delete">
								<img
									src={require('../../assets/images/garbage.png')}
									alt="delete"
									onClick={() => this.handleDelete(category)}
									style={{ height: 16, marginRight: 20, cursor: 'pointer' }}
								/>
							</Tooltip>
							{category.description}
						</p>
					</div>
					<div>
						<p>
							{parseFloat(category.amount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
							<Tooltip title="Release Funds">
								<img
									src={require('../../assets/images/unlocked.png')}
									alt="release funds"
									onClick={() =>
										this.setState({ showReleaseDialog: true, category: category.category_id })}
									style={{ height: 20, marginLeft: 20, cursor: 'pointer' }}
								/>
							</Tooltip>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

Category.propTypes = {
	deleteCategory: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { deleteCategory })(Category);
