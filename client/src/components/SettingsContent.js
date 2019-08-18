import React, { Component } from 'react'
import Header from './common/Header';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { deleteAccount } from '../actions/profileActions';


class SettingsContent extends Component {

    handleDeleteAccount = () => {
        this.props.deleteAccount();
        localStorage.removeItem('budget');
    }

    render() {
        return (
            <div>
                <Header text="Settings" />

                <Button onClick={this.handleDeleteAccount}> Delete Account </Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile
})

export default connect(mapStateToProps, { deleteAccount })(SettingsContent);