import React, { Component } from 'react'
import Navbar from './Navbar';
import { Drawer, Button, Hidden, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { logoutUser } from '../../actions/authActions';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { connect } from 'react-redux';


const drawerWidth = 300;

const styles = theme => ({

    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: drawerWidth,
        borderLeft: '8px solid #2e58ff',
        borderRight: 0,
        background: 'linear-gradient(to right, #d6d6d6, #ffffff)'
    },
    toolbar: theme.mixins.toolbar,
    logoImage: {
        height: 100,
        display: 'block',
        margin: '20px auto'
    },
    welcomeMessage: {
        textAlign: 'center'
    },
    logoutButton: {
        padding: '5px 50px'
    },
    link: {
        textDecoration: 'none',
        color: '#000'
    }
});


class AppDrawer extends Component {

    state = {
        mobileOpen: false,
        fsfOpen: false
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleFSFToggle = () => {
        this.setState(state => ({ fsfOpen: !state.fsfOpen }));
    };

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }


    render() {

        const { classes } = this.props;
        const drawer = (
            <div className={classes.toolbar}>
                <img src={require('../../assets/images/logo.png')} className={classes.logoImage} alt="logo" />
                <Typography variant="h6" gutterBottom className={classes.welcomeMessage}>
                    <p>Welcome, {this.props.user.firstName}! </p>
                    <Button onClick={this.handleLogout} className={classes.logoutButton}>Logout</Button>
                </Typography>
                <List dense>
                    <Link className={classes.link} to="/dashboard">
                        <ListItem button >
                            <Home style={{ marginRight: 16 }} />
                            <ListItemText primary="Budget" />
                        </ListItem>
                    </Link>
                    <Link className={classes.link} to="/dashboard/settings">
                        <ListItem button >
                            <Settings style={{ marginRight: 16 }} />

                            <ListItemText primary="Settings" />
                        </ListItem>
                    </Link>
                    <Link className={classes.link} to="/dashboard/transactions">
                        <ListItem button >
                            <AttachMoney style={{ marginRight: 16 }} />
                            <ListItemText primary="Transactions" />
                        </ListItem>
                    </Link>





                </List >

            </div >
        );

        return (
            <div>
                <Navbar handleDrawerToggle={this.handleDrawerToggle} />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor='left'
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>


            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(AppDrawer));