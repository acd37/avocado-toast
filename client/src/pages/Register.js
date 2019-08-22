import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

// UI Components
import { Button, TextField, Typography, InputAdornment, IconButton, Input, InputLabel, FormControl } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
    header: {
        textAlign: 'center',
        color: '#2e58ff',
        fontWeight: 300,
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

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            showPassword2: false,
            showPassword: false,
            errors: {}
        }
    }

    // componentDidMount() {
    //     if (this.props.auth.isAuthenticated) {
    //         this.props.history.push('/dashboard');
    //     }
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {

            if (nextProps.location.state) {
                const prevLocation = nextProps.location.state.from.pathname;
                this.props.history.push(prevLocation);
            } else {
                this.props.history.push('/dashboard');
            }

        }

        if (nextProps.userCreated) {

            this.props.history.push("/")
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

    handleRegisterUser = e => {
        e.preventDefault();

        if (this.state.password !== this.state.password2) {
            this.setState({
                errors: {
                    msg: "Password fields must match."
                }
            })
        }
        const userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };

        this.props.registerUser(userData, this.props.history)
        console.log(this.props.history)

    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowPassword2 = () => {
        this.setState(state => ({ showPassword2: !state.showPassword2 }));
    };

    render() {

        const { errors } = this.state;
        const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

        return (

            <div style={styles.loginCard}>

                <h1 style={styles.header}>  AvocadoToast </h1>

                <img src={require('../assets/images/logo.png')} style={styles.logo} alt="cs logo" />

                <Typography variant="subtitle1" gutterBottom style={styles.subHeading}>
                    Register
                </Typography>


                <form
                    onSubmit={this.handleRegisterUser}
                    autoComplete="new-password"
                    noValidate
                >

                    <TextField
                        id="firstName"
                        label="First Name"
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                        style={styles.textField}
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                        style={styles.textField}
                    />

                    <TextField
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        style={styles.textField}
                    />

                    <FormControl style={{ width: '100%', marginTop: 16, marginBottom: 8 }}>
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

                    <FormControl style={{ width: '100%', marginTop: 16, marginBottom: 8 }}>
                        <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                        <Input
                            id="password2"
                            autoComplete="new-password"
                            type={this.state.showPassword2 ? 'text' : 'password'}
                            label="Password2"
                            value={this.state.password2}
                            onChange={this.handleChange('password2')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword2}
                                    >
                                        {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                    </FormControl>

                    <Button type="submit" style={styles.button} className="btn-primary">
                        Register
                    </Button>

                </form>
                <div style={styles.errorMessage}>
                    {errors ? errors.msg : ""}
                </div>

                <Typography variant="subtitle1" style={styles.signup}>
                    ———— Already registered? ————
                </Typography>

                <Button component={AdapterLink} to='/' style={styles.buttonNew} className="btn-primary">
                    Back to Login
                </Button>


            </div >
        )
    }
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    userCreated: state.auth.userCreated
})

export default withRouter(connect(mapStateToProps, { registerUser })(Register));