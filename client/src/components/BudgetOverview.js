import React, { Component } from 'react';
import { connect } from 'react-redux';
import getRemainingBalance from '../utils/getRemainingBalance';
import Button from '@material-ui/core/Button';
import TransferDialog from './dialogs/TransferDialog';
import IncomeDialog from './dialogs/IncomeDialog';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';


const styles = {
	cardWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap'
	},

	card: {
		background: '#fff',
		borderRadius: '0.375rem',
		boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
		padding: 15,
		boxSizing: 'border-box',
		marginRight: 10,
		marginTop: 10,
		width: 350,
		maxWidth: '90%',
	},
	'@media (max-width: 599px)': {
		card: {
			width: '100%',
			// margin: '0'
		}
	},
	cardHeader: {
		marginTop: 0,
		marginBottom: 5,
		fontSize: '2em',
		color: '#404040',
		fontWeight: 300,
		fontFamily: 'Lato'
	}
};

class BudgetOverview extends Component {
	state = {
		showTransferDialog: false,
		showIncomeDialog: false,
		stockChange: ''
	};

	componentDidMount() {
		axios
			.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DOW&apikey=4JL5F2TIUB3E4EE8')
			.then((response) => {
				if (response.data['Global Quote']) {
					let stockChange = response.data['Global Quote']['10. change percent'];
					this.setState({
						stockChange
					});
				} else if (response.data['Note']) {
					this.setState({
						stockChange: 'No data'
					});
				}
			});
	}

	handleCloseIncomeDialog = () => {
		this.setState({ showIncomeDialog: false });
	};

	handleCloseTransferDialog = () => {
		this.setState({ showTransferDialog: false });
	};

	render() {

		const { classes } = this.props;


		const { remainingBalance } = this.props.profile.profile;
		const { Categories } = this.props.profile.profile;
		const totalRemainingBalance = getRemainingBalance(Categories, remainingBalance);

		return (
			<div>
				<TransferDialog handleClose={this.handleCloseTransferDialog} open={this.state.showTransferDialog} />

				<IncomeDialog handleClose={this.handleCloseIncomeDialog} open={this.state.showIncomeDialog} />

				<div className={classes.cardWrapper}>
					<div className={classes.card}>
						<h2 className={classes.cardHeader}>To Be Budgeted</h2>
						<h2>
							{parseFloat(remainingBalance).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
						</h2>
						<Button onClick={() => this.setState({ showTransferDialog: true })}> Transfer Money </Button>
					</div>
					<div className={classes.card}>
						<h2 className={classes.cardHeader}>Balance</h2>
						<h2>
							{parseFloat(totalRemainingBalance).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}{' '}
						</h2>
						<Button style={{ display: 'inline' }} onClick={() => this.setState({ showIncomeDialog: true })}>
							{' '}
							+ Income{' '}
						</Button>
					</div>
					<div className={classes.card}>
						<h2 className={classes.cardHeader}>DOW: Daily Change</h2>
						<p>
							{this.state.stockChange.length < 1 ? 'Loading data...' : <h2>{this.state.stockChange}</h2>}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	loading: state.auth.loading,
	profile: state.profile
});

export default connect(mapStateToProps, {})(
	withStyles(styles)(BudgetOverview)
);
