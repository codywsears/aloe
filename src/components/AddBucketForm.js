import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class AddBucketForm extends Component {
    render() { 
        let { handleSubmit, onSubmit } = this.props;
        return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="bucketName">Bucket Name</label>
                <Field name="bucketName" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>);
    }
}

AddBucketForm = reduxForm({
    form: 'addBucketForm'
})(AddBucketForm);

export default AddBucketForm;