import React, { Component } from 'react';
import { connect } from 'react-redux';
import { releaseFunds } from '../actions/profileActions';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ReleaseDialog extends Component {

    state = {
        category: '',
        amount: '0.00'
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCategoryChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target)
    };

    handleReleaseFunds = (e) => {
        e.preventDefault();

        const newTransaction = {
            releaseAmount: this.state.amount,
            UserId: this.props.auth.user.id,
            CategoryId: this.props.category
        }

        this.setState({
            amount: '0.00',
        })
        this.props.releaseFunds(newTransaction);
        this.props.handleClose();
    }


    render() {
        return (
            <div>

                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Release Funds</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Amount"
                            type="number"
                            name="amount"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.amount}
                        />
                    </DialogContent>

                    {
                        this.state.success ? <p>this.state.success </p> : ''
                    }
                    <DialogActions>
                        <Button onClick={this.props.handleClose}>
                            Cancel
                  </Button>
                        <Button onClick={this.handleReleaseFunds}>
                            Release
                  </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, { releaseFunds })(ReleaseDialog);