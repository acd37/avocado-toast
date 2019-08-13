import React, { Component } from 'react';
import PropTypes from 'prop-types';

// State Management
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

// UI Components
import { AppBar, Toolbar, IconButton } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const styles = theme => ({
    appBar: {
        marginLeft: drawerWidth,
        backgroundColor: '#fff',
        boxShadow: 'none',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
});

class Navbar extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" elevation={2} color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit"
                            onClick={this.props.handleDrawerToggle} aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(withStyles(styles, { withTheme: true })(Navbar)));