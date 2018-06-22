import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './shared/materialUIRender';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
})

class CreateTripForm extends Component {
    render() { 
        let { handleSubmit, onSubmit, classes } = this.props;
        return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Field autoFocus name="tripName" label="Event Name" placeholder="event" margin="normal" component={renderTextField} type="text" />
            </div>
            <div>
                <Button margin="normal" type="submit">SUBMIT</Button>
            </div>
        </form>);
    }
}

CreateTripForm = reduxForm({
    form: 'createTripForm'
})(CreateTripForm);

export default withStyles(styles)(CreateTripForm);