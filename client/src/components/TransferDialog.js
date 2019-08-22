import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFunds } from '../actions/profileActions';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class TransferDialog extends Component {

    state = {
        category: '',
        amount: '0.00',
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

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

    handleLoadFunds = (e) => {
        e.preventDefault();



        const loadFunds = {
            transferAmount: this.state.amount,
            CategoryId: this.state.category,
            UserId: this.props.auth.user.id
        }

        if (!loadFunds.CategoryId) {
            alert("You must select a category to transfer to.")
        } else if (parseFloat(loadFunds.transferAmount) < 0.01) {
            alert("Minimum transfer amount is $0.01")
        } else if (parseFloat(this.props.profile.profile.remainingBalance) < parseFloat(loadFunds.transferAmount)) {
            alert("You don't have the available funds to make this transfer.")
        } else {
            this.setState({
                category: '',
                amount: '0.00',
            })
            this.props.loadFunds(loadFunds);
            this.props.handleClose();
        }

    }


    render() {
        const { Categories } = this.props.profile.profile;
        return (
            <div>

                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Transfer Funds</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                value={this.state.category}
                                onChange={this.onCategoryChange}
                                name='category'
                            >
                                {
                                    Categories.map(category => (
                                        <MenuItem
                                            key={category.category_id}
                                            value={category.category_id}>{category.description}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
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
                        <Button onClick={this.handleLoadFunds}>
                            Submit
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

export default connect(mapStateToProps, { loadFunds })(TransferDialog);