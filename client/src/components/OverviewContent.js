/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import getRemainingBalance from '../utils/getRemainingBalance';
import Button from '@material-ui/core/Button'
import Header from './common/Header';
import CategoryDialog from './CategoryDialog';
import TransferDialog from './TransferDialog';
import IncomeDialog from './IncomeDialog';
import ReleaseDialog from './ReleaseDialog';

import { deleteCategory } from '../actions/profileActions';

const styles = {
    button: {
        margin: 5
    },
    card: {
        background: '#fff',
        borderRadius: '0.375rem',
        boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
        // display: 'flex',
        flexDirection: 'column',
        padding: 15,
        boxSizing: 'border-box',
        marginRight: 10,
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
        showCategoryDialog: false,
        showTransferMoneyDialog: false,
        showTransferDialog: false,
        showIncomeDialog: false,
        showReleaseDialog: false
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

    handleCloseReleaseDialog = () => {
        this.setState({ showReleaseDialog: false })
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



    render() {

        const { remainingBalance } = this.props.profile.profile;
        const { Categories } = this.props.profile.profile;
        const totalRemainingBalance = getRemainingBalance(Categories, remainingBalance);

        return (
            <div>
                <Header text={"Hi, " + this.props.auth.user.firstName} />

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

                <ReleaseDialog
                    handleClose={this.handleCloseReleaseDialog}
                    open={this.state.showReleaseDialog}
                    category={this.state.category}
                />


                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={styles.card}>
                        <h2>To-be-budgeted</h2>
                        <h2>${parseFloat(remainingBalance).toFixed(2)}</h2>
                        <Button onClick={() => this.setState({ showTransferDialog: true })}> Transfer Money </Button>

                    </div>
                    <div style={styles.card}>
                        <h2>Balance</h2>
                        <h2>${parseFloat(totalRemainingBalance).toFixed(2)} </h2>
                        <Button style={{ display: 'inline' }} onClick={() => this.setState({ showIncomeDialog: true })}> + Income </Button>
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
                                    <p>${category.amount}
                                        <img src={require('../assets/images/unlocked.png')} onClick={() => this.setState({ showReleaseDialog: true, category: category.category_id })} style={{ height: 20, marginLeft: 20, cursor: 'pointer' }} />
                                    </p>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <Button onClick={() => this.setState({ showCategoryDialog: true })}> + Add New </Button>

            </div >
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile
})

export default connect(mapStateToProps, { deleteCategory })(OverviewContent);