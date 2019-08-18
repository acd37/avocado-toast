/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import Header from './common/Header';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

const styles = {
    transaction: {
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

class TransactionsContent extends Component {
    render() {
        const { Transactions } = this.props.profile.profile;

        let content;

        if (Transactions.length > 0) {
            content = (

                Transactions.map(transaction => (
                    <div key={transaction.transaction_id} style={styles.transaction}>
                        <div>
                            <p>
                                <img
                                    src={require('../assets/images/garbage.png')}
                                    onClick={() => this.handleDelete(transaction)}
                                    style={{ height: 16, marginRight: 20, cursor: 'pointer' }}
                                />
                                {transaction.description} <span style={{ fontSize: '0.7rem', marginLeft: 30 }}>[<Moment date={transaction.createdAt} format="MMM Do, YYYY" />]</span>
                            </p>
                        </div>
                        <div>
                            <p>${transaction.amount}</p>
                        </div>

                    </div>
                ))

            )
        } else {
            content = "You have no current transactions."
        }

        return (
            <div>
                <Header text="Transactions" />

                {content}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile
})

export default connect(mapStateToProps, {})(TransactionsContent);