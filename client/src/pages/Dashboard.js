import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppDrawer from '../components/common/AppDrawer';
import PrivateRoute from '../components/common/PrivateRoute';
import OverviewContent from '../components/OverviewContent'
import SettingsContent from '../components/SettingsContent'
import TransactionsContent from '../components/TransactionsContent'


const styles = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        marginTop: 70,
        maxWidth: '90%'
    },
});

class Dashboard extends Component {

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppDrawer />

                <main className={classes.content}>
                    <PrivateRoute exact path="/dashboard" component={OverviewContent} />
                    <PrivateRoute exact path="/dashboard/settings" component={SettingsContent} />
                    <PrivateRoute exact path="/dashboard/transactions" component={TransactionsContent} />
                </main>
            </div>

        )
    }

}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, {})(withStyles(styles)(Dashboard));