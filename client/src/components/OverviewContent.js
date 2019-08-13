import React, { Component } from 'react'
import { connect } from 'react-redux';
import getRemainingBalance from '../utils/getRemainingBalance';
import Button from '@material-ui/core/Button'
import TransactionDialog from './TransactionDialog';
import Header from './common/Header';


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
    }
}



class OverviewContent extends Component {

    handleOpenTransactionDialog = () => {
        return <TransactionDialog />

    }


    render() {

        const { categories, remainingBalance } = this.props.auth.user;
        const totalRemainingBalance = getRemainingBalance(categories, remainingBalance);

        return (
            <div>
                <Header user={this.props.auth.user} />


                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button style={styles.button} onClick={this.handleOpenTransactionDialog}> Add Transaction </Button>
                    <Button style={styles.button}> Add Category </Button>
                    <Button style={styles.button}> Transfer Money </Button>
                    <Button style={styles.button}> Reset </Button>

                </div>


                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={styles.card}>
                        <h2>${totalRemainingBalance.toFixed(2)} </h2>
                    </div>

                    <div style={styles.card}>
                        <h3>To-be-budgeted: ${remainingBalance}</h3>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <div style={styles.card}>
                        <h1>Categories</h1>
                        {
                            categories.map(category => (
                                <p>{category.description}: ${category.amount}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {})(OverviewContent);