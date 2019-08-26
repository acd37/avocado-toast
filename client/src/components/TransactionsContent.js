/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import Button from '@material-ui/core/Button';
import TransactionDialog from './dialogs/TransactionDialog';
import { deleteTransaction } from '../actions/profileActions';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
	transaction: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		border: 'none',
		padding: '0px 20px',
		marginBottom: 10,
		boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
		borderRadius: '0.375rem'
	},
	contentWrapper: {
		marginTop: 20,
		marginBottom: 20
	}
};

class TransactionsContent extends Component {
	state = {
		showTransactionDialog: false
	};

	handleCloseTransactionDialog = () => {
		this.setState({ showTransactionDialog: false });
	};

	handleDelete = (transaction) => {
		let userConfirmation = window.confirm('Are you sure you want to delete this transaction?');
		if (userConfirmation) {
			this.props.deleteTransaction(transaction.transaction_id);
		}
	};

	render() {
		const { Transactions } = this.props.profile.profile;

		let content;

		if (Transactions.length > 0) {
			content = Transactions.map((transaction) => (
				<div key={transaction.transaction_id} style={styles.transaction}>
					<div>
						<p>
							<Tooltip title="Delete">
								<img
									src={require('../assets/images/garbage.png')}
									onClick={() => this.handleDelete(transaction)}
									style={{ height: 16, marginRight: 20, cursor: 'pointer' }}
								/>
							</Tooltip>
							{transaction.description}{' '}
							<span style={{ fontSize: '0.7rem', marginLeft: 30 }}>
								[<Moment date={transaction.createdAt} format="MMM Do, YYYY" />]
							</span>
						</p>
					</div>
					<div>
						<p>${transaction.amount}</p>
					</div>
				</div>
			));
		} else {
			content = 'You have no current transactions.';
		}

		return (
			<div>
				<Header text="Transactions" />

				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Button style={styles.button} onClick={() => this.setState({ showTransactionDialog: true })}>
						{' '}
						Add Transaction{' '}
					</Button>
				</div>

				<TransactionDialog
					handleClose={this.handleCloseTransactionDialog}
					open={this.state.showTransactionDialog}
				/>

				<div style={styles.contentWrapper}>{content}</div>
			</div>
		);
	}
}

TransactionsContent.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteTransaction: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
	auth: state.auth,
	loading: state.auth.loading,
	profile: state.profile
});

export default connect(mapStateToProps, { deleteTransaction })(TransactionsContent);
