/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Header from './common/Header';
import CategoryDialog from './dialogs/CategoryDialog';
import Category from './common/Category';
import BudgetOverview from './BudgetOverview';

class OverviewContent extends Component {
	state = {
		showCategoryDialog: false
	};

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleCloseCategoryDialog = () => {
		this.setState({ showCategoryDialog: false });
	};

	render() {
		const { Categories } = this.props.profile.profile;

		return (
			<div>
				<Header text={'Hi, ' + this.props.auth.user.firstName} />

				<CategoryDialog handleClose={this.handleCloseCategoryDialog} open={this.state.showCategoryDialog} />

				<BudgetOverview />

				<div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
					<Header text="Categories" />
					{Categories.map((category) => <Category key={category.category_id} category={category} />)}
				</div>
				<Button onClick={() => this.setState({ showCategoryDialog: true })}> + Add New </Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, {})(OverviewContent);
