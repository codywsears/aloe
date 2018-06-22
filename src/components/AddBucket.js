import React, { Component } from 'react';
import { createBucketAction, toggleAddBucketModal } from '../redux/actions';
import { connect } from 'react-redux';
import Modal from './shared/Modal';
import AddBucketForm from './AddBucketForm';
import Button from '@material-ui/core/Button';

class AddBucket extends Component {
    submitBucket = values => {
        let { createBucket, tripId, colorPool } = this.props;
        let color = false, idx = 0;
        let colors = Object.keys(colorPool);

        while(!color && idx < colors.length) {
            //the color has not been assigned
            if (!colorPool[colors[idx]]) {
                color = colors[idx];
            }
            idx++;
        }

        if(!color) {
            color = 'teal'
        }

        //return a promise as work around for redux-forms
        return new Promise((resolve, reject) => {
            createBucket(tripId, values.bucketName, color, false, resolve, reject);
        }).then(() => {this.props.toggleModal()});
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
                    <div>
                            <Modal show={this.props.showModal} title="Add Bucket" onClose={this.closeModal}>
                                <AddBucketForm onSubmit={this.submitBucket}/>
                            </Modal>
                            <Button variant="contained" color="primary" onClick={this.showModal} className="addbucket_button">Add Bucket</Button>
                    </div>
                }
            </div>);
    }
}

var mapStateToProps = state => {
    return {
        showModal: state.ui.showAddBucketModal,
        colorPool: state.ui.bucketColorPool
    }
}

var mapDispatchToProps = {
    createBucket: createBucketAction,
    toggleModal: toggleAddBucketModal
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBucket);