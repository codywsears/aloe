import React, { Component } from 'react';
import Modal from './shared/Modal';
import { toggleAddResourceModal } from '../redux/actions';
import { connect } from 'react-redux';
import AddResourceForm from './AddResourceForm';

class AddResourceModal extends Component {
    closeModal = () => {
        let { bucketId } = this.props;
        this.props.toggleModal(bucketId);
    }

    render() { 
        let { showModal, bucketId } = this.props;
        return ( 
            <Modal show={showModal[bucketId]} title="Add Resource" onClose={this.closeModal}>
                <AddResourceForm onSubmit={this.props.createResource}/>
            </Modal>
        )
    }
}
 
var mapStateToProps = state => {
    return {
        showModal: state.ui.showAddResourceModal
    }
}

var mapDispatchToProps = {
    // createResource: createResourceAction,
    toggleModal: toggleAddResourceModal
}


export default connect(mapStateToProps, mapDispatchToProps)(AddResourceModal);