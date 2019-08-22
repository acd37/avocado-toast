import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// UI Components
import { Button, TextField, Typography, InputAdornment, IconButton, Input, InputLabel, FormControl } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
    header: {
        textAlign: 'center',
        color: '#2e58ff',
        fontWeight: 300,
        // textTransform: 'uppercase'
    },
    loginCard: {
        maxWidth: '90%',
        width: 400,
        borderRadius: 6,
        boxShadow: '0 0 30px -5px hsla(0,0%,40.8%,.45)',
        backgroundColor: "#fff",
        padding: '24px 32px',
        margin: '50px auto 0 auto'
    },
    logo: {
        height: 100,
        width: 100,
        display: 'block',
        margin: '20px auto'
    },
    button: {
        marginTop: 20,
        width: '100%'
    },
    buttonNew: {
        // marginTop: 20,
        width: '100%'
    },
    textField: {
        width: '100%'
    },
    subHeading: {
        textAlign: 'center',
        fontWeight: 300
    },
    signup: {
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 300,
        fontSize: '0.8em',
    },
    forgotPassword: {
        fontSize: '0.8rem',
        color: "#999",
        marginTop: 20
    },
    errorMessage: {
        marginTop: 10,
        color: '#cc0000',
        fontSize: '0.8rem'
    },
    buttonLoading: {
        color: '#13c6e6',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12

    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword: false,
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {

            if (nextProps.location.state) {
                const prevLocation = nextProps.location.state.from.pathname;
                this.props.history.push(prevLocation);
            } else {
                this.props.history.push('/dashboard');
            }

        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleLoginUser = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData)

    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {

        const { errors } = this.state;
        const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

        return (

            <div style={styles.loginCard}>

                <h1 style={styles.header}>  AvocadoToast </h1>

                <img src={require('../assets/images/logo.png')} style={styles.logo} alt="cs logo" />

                <Typography variant="subtitle1" gutterBottom style={styles.subHeading}>
                    Login with email and password
                </Typography>


                <form
                    onSubmit={this.handleLoginUser}
                    autoComplete="new-password"
                    noValidate
                >

                    <TextField
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        style={styles.textField}
                    />

                    <FormControl style={styles.textField}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            autoComplete="new-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                    </FormControl>

                    <Button type="submit" style={styles.button} className="btn-primary">
                        Login
                    </Button>

                </form>
                <div style={styles.errorMessage}>
                    {errors ? errors.msg : ""}
                </div>

                <Typography variant="subtitle1" style={styles.signup}>
                    ———— Or Sign Up ————
                </Typography>

                <Button component={AdapterLink} to='/register' style={styles.buttonNew} className="btn-primary">
                    New Account
                </Button>
                <div style={styles.forgotPassword}>
                    Forgot your password? Reset <a href="/forgot-password" >here</a>.
                </div>



            </div >
        )
    }
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);