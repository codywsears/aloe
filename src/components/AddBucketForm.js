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

class AddBucketForm extends Component {
    render() { 
        let { handleSubmit, onSubmit, classes } = this.props;
        return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Field name="bucketName" label="Bucket Name" placeholder="bucket" margin="normal" component={renderTextField} type="text" />
            </div>
            <div>
                <Button margin="normal" type="submit">Submit</Button>
            </div>
        </form>);
    }
}

AddBucketForm = reduxForm({
    form: 'addBucketForm'
})(AddBucketForm);

export default withStyles(styles)(AddBucketForm);