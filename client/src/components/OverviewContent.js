import React, { Component } from 'react'
import { connect } from 'react-redux';
import getRemainingBalance from '../utils/getRemainingBalance';
import Button from '@material-ui/core/Button'
import Header from './common/Header';
import TransactionDialog from './TransactionDialog';
import CategoryDialog from './CategoryDialog';
import TransferDialog from './TransferDialog';
import IncomeDialog from './IncomeDialog';
import { resetUser, deleteCategory } from '../actions/profileActions';

const styles = {
    button: {
        margin: 5
    },
    card: {
        background: '#fff',
        borderRadius: 10,
        boxShadow: '1px 1px 40px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        boxSizing: 'border-box',
        margin: 5,
        width: '100%'
    },
    row: {
        margin: 5
    },
    categoryLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: 'none',
        padding: '5px 20px',
        marginBottom: 10,
        boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
        borderRadius: '0.375rem',
    }
}

class OverviewContent extends Component {

    state = {
        showTransactionDialog: false,
        showCategoryDialog: false,
        showTransferMoneyDialog: false,
        showTransferDialog: false,
        showIncomeDialog: false
    }


    handleCloseTransactionDialog = () => {
        this.setState({ showTransactionDialog: false })
    }

    handleCloseIncomeDialog = () => {
        this.setState({ showIncomeDialog: false })
    }

    handleCloseCategoryDialog = () => {
        this.setState({ showCategoryDialog: false })
    }

    handleCloseTransferDialog = () => {
        this.setState({ showTransferDialog: false })
    }

    handleCloseTransferMoneyDialog = () => {
        this.setState({ showTransferMoneyDialog: false })
    }

    handleDelete = (category) => {
        let userConfirmation = window.confirm("Are you sure you want to delete the following category: " + category.description + "?")
        if (userConfirmation) {
            this.props.deleteCategory(category.category_id);
        }
    }

    handleResetUser = () => {
        let confirmation = window.confirm("Are you sure you're ready to reset the month?");
        if (confirmation) {
            this.props.resetUser();
        }
    }

    render() {

        const { remainingBalance } = this.props.profile.profile;
        const { Categories } = this.props.profile.profile;
        // const totalRemainingBalance = getRemainingBalance(Categories, remainingBalance);

        return (
            <div>
                <Header text={"Hi, " + this.props.auth.user.firstName} />


                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button style={styles.button} onClick={() => this.setState({ showIncomeDialog: true })}> Add Income </Button>
                    <Button style={styles.button} onClick={() => this.setState({ showTransactionDialog: true })}> Add Transaction </Button>
                    <Button style={styles.button} onClick={() => this.setState({ showTransferDialog: true })}> Transfer Money </Button>
                    <Button style={styles.button} onClick={this.handleResetUser}> Reset </Button>
                </div>

                <TransactionDialog
                    handleClose={this.handleCloseTransactionDialog}
                    open={this.state.showTransactionDialog}
                />

                <CategoryDialog
                    handleClose={this.handleCloseCategoryDialog}
                    open={this.state.showCategoryDialog}
                />

                <IncomeDialog
                    handleClose={this.handleCloseIncomeDialog}
                    open={this.state.showIncomeDialog}
                />


                <TransferDialog
                    handleClose={this.handleCloseTransferDialog}
                    open={this.state.showTransferDialog}
                />


                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={styles.card}>
                        <h3>To-be-budgeted: ${remainingBalance}</h3>
                    </div>
                    <div style={styles.card}>
                        {/* <h2>${totalRemainingBalance.toFixed(2)} </h2> */}
                    </div>


                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }} >
                    <h1>Budget Categories</h1>
                    {
                        Categories.map(category => (
                            <div key={category.category_id} style={styles.categoryLine}>
                                <div>
                                    <p>
                                        <img src={require('../assets/images/garbage.png')} onClick={() => this.handleDelete(category)} style={{ height: 16, marginRight: 20, cursor: 'pointer' }} />
                                        {category.description}
                                    </p>
                                </div>
                                <div>
                                    <p>${category.amount}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <Button onClick={() => this.setState({ showCategoryDialog: true })}> + Add New </Button>

            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile
})

export default connect(mapStateToProps, { deleteCategory, resetUser })(OverviewContent);