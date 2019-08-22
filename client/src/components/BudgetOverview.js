import React, { Component } from 'react'
import { connect } from 'react-redux';
import getRemainingBalance from '../utils/getRemainingBalance';
import Button from '@material-ui/core/Button'
import TransferDialog from './dialogs/TransferDialog';
import IncomeDialog from './dialogs/IncomeDialog';

const styles = {
    card: {
        background: '#fff',
        borderRadius: '0.375rem',
        boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
        padding: 15,
        boxSizing: 'border-box',
        marginRight: 10,
        marginTop: 10,
        width: 400,
        maxWidth: '90%'
    }
}

class BudgetOverview extends Component {

    state = {
        showTransferDialog: false,
        showIncomeDialog: false,
    }

    handleCloseIncomeDialog = () => {
        this.setState({ showIncomeDialog: false })
    }

    handleCloseTransferDialog = () => {
        this.setState({ showTransferDialog: false })
    }


    render() {

        const { remainingBalance } = this.props.profile.profile;
        const { Categories } = this.props.profile.profile;
        const totalRemainingBalance = getRemainingBalance(Categories, remainingBalance);

        return (
            <div>
                <TransferDialog
                    handleClose={this.handleCloseTransferDialog}
                    open={this.state.showTransferDialog}
                />

                <IncomeDialog
                    handleClose={this.handleCloseIncomeDialog}
                    open={this.state.showIncomeDialog}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={styles.card}>
                        <h2>To-be-budgeted</h2>
                        <h2>{parseFloat(remainingBalance).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
                        <Button onClick={() => this.setState({ showTransferDialog: true })}> Transfer Money </Button>

                    </div>
                    <div style={styles.card}>
                        <h2>Balance</h2>
                        <h2>{parseFloat(totalRemainingBalance).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </h2>
                        <Button style={{ display: 'inline' }} onClick={() => this.setState({ showIncomeDialog: true })}> + Income </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile
})

export default connect(mapStateToProps, {})(BudgetOverview);