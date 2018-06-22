import React, {Component} from 'react';
import { createTripAction, createBucketAction } from '../redux/actions';
import { connect } from 'react-redux';
import CreateTripForm from './CreateTripForm';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';


class CreateTripContainer extends Component {
    submitTrip = (values) => {
        let { createTrip, history, createBucket } = this.props;
        let { tripName } = values;

        return new Promise((resolve, reject) => {
            createTrip(tripName, resolve, reject);
        }).then(newTrip => {
            createBucket(newTrip.id, 'free to grab', 'teal', true);
            history.push(`/trips/${newTrip.id}`);
        });
    }

    render() { 
        return (
            <div className="createtrip__container">
                <Typography variant="headline">Start An Event</Typography>
                <CreateTripForm onSubmit={this.submitTrip}/>
            </div>
        )
    }
}
 
const mapDispatchToProps = {
    createTrip: createTripAction,
    createBucket: createBucketAction
}

export default withRouter(connect(() => ({}), mapDispatchToProps)(CreateTripContainer));