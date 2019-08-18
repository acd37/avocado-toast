import React, { Component } from 'react'
import Header from './common/Header';
import { connect } from 'react-redux';


class SettingsContent extends Component {
    render() {
        return (
            <div>
                <Header text="Settings" />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,
    profile: state.profile
})

export default connect(mapStateToProps, {})(SettingsContent);