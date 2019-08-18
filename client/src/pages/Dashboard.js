import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppDrawer from '../components/common/AppDrawer';
import PrivateRoute from '../components/common/PrivateRoute';
import OverviewContent from '../components/OverviewContent'
import SettingsContent from '../components/SettingsContent'
import TransactionsContent from '../components/TransactionsContent'
import { getCurrentProfile, deleteAccount } from '../actions/profileActions';

const styles = {
    root: {
        display: 'flex'
    },
    content: {
        padding: 30,
        marginLeft: 300,
        maxWidth: '90%'
    },
};

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {

        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = "Loading..."
        } else {
            dashboardContent = (
                <div>
                    <AppDrawer />

                    <main style={styles.content}>
                        <PrivateRoute exact path="/dashboard" component={OverviewContent} />
                        <PrivateRoute exact path="/dashboard/settings" component={SettingsContent} />
                        <PrivateRoute exact path="/dashboard/transactions" component={TransactionsContent} />
                    </main>
                </div>

            )
        }

        return (
            <div >
                {dashboardContent}
            </div>

        )
    }

}

const mapStateToProps = state => ({
    user: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(withStyles(styles)(Dashboard));