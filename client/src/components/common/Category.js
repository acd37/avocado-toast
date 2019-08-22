import React, { Component } from 'react'
import { deleteCategory } from '../../actions/profileActions';
import { connect } from 'react-redux';
import ReleaseDialog from '../dialogs/ReleaseDialog';

const styles = {
    categoryLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: 'none',
        padding: '0px 20px',
        marginBottom: 10,
        boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)',
        borderRadius: '0.375rem',
    }
}

class Category extends Component {
    state = {
        showReleaseDialog: false
    }

    handleCloseReleaseDialog = () => {
        this.setState({ showReleaseDialog: false })
    }

    handleDelete = (category) => {
        let userConfirmation = window.confirm("Are you sure you want to delete the following category: " + category.description + "?")
        if (userConfirmation) {
            this.props.deleteCategory(category.category_id);
        }
    }

    render() {

        const { category } = this.props;

        return (
            <div>
                <ReleaseDialog
                    handleClose={this.handleCloseReleaseDialog}
                    open={this.state.showReleaseDialog}
                    category={this.state.category}
                />

                <div key={category.category_id} style={styles.categoryLine}>
                    <div>
                        <p>
                            <img src={require('../../assets/images/garbage.png')} alt="delete" onClick={() => this.handleDelete(category)} style={{ height: 16, marginRight: 20, cursor: 'pointer' }} />
                            {category.description}
                        </p>
                    </div>
                    <div>
                        <p>${category.amount}
                            <img src={require('../../assets/images/unlocked.png')} alt="release funds" onClick={() => this.setState({ showReleaseDialog: true, category: category.category_id })} style={{ height: 20, marginLeft: 20, cursor: 'pointer' }} />
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { deleteCategory })(Category);