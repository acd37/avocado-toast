import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../actions/profileActions';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CategoryDialog extends Component {

    state = {
        description: '',
        errors: {}
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

    handleSubmitCategory = (e) => {
        e.preventDefault();
        const newCategory = {
            description: this.state.description,
            UserId: this.props.auth.user.id
        }
        this.props.createCategory(newCategory);
        this.setState({
            description: ''
        })
        this.props.handleClose();
    }

    render() {
        return (
            <div>

                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            name="description"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.description}
                        />
                    </DialogContent>

                    {
                        this.state.success ? <p>this.state.success </p> : ''
                    }
                    <DialogActions>
                        <Button onClick={this.props.handleClose}>
                            Cancel
                  </Button>
                        <Button onClick={this.handleSubmitCategory}>
                            Submit
                  </Button>
                    </DialogActions>
                    {this.state.errors.categories ? this.state.errors.categories : ''}

                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    categories: state.categories
})

export default connect(mapStateToProps, { createCategory })(CategoryDialog);