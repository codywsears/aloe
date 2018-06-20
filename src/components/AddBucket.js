import React, { Component } from 'react';
import { createBucketAction, toggleAddBucketModal } from '../redux/actions';
import { connect } from 'react-redux';
import Modal from './shared/Modal';
import AddBucketForm from './AddBucketForm';

class AddBucket extends Component {
    submitBucket = values => {
        let { createBucket, tripId } = this.props;

        //return a promise as work around for redux-forms
        return new Promise((resolve, reject) => {
            createBucket(tripId, values.bucketName, resolve, reject);
        }).then(this.props.toggleModal());
    }

    showModal = () => {
        this.props.toggleModal();
    }

    closeModal = () => {
        this.props.toggleModal();
    }

    render() { 
        return (<div>
                {
                    this.props.showModal ? 
                    <Modal show={this.props.showModal} title="Add Bucket" onClose={this.closeModal}>
                        <AddBucketForm onSubmit={this.submitBucket}/>
                    </Modal>
                    :
                    <button onClick={this.showModal} className="addbucket_button">Add Bucket</button>
                }
            </div>);
    }
}

var mapStateToProps = state => {
    return {
        showModal: state.ui.showAddBucketModal
    }
}

var mapDispatchToProps = {
    createBucket: createBucketAction,
    toggleModal: toggleAddBucketModal
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBucket);