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

class AddResourceForm extends Component {
    render() { 
        let { handleSubmit, onSubmit, classes } = this.props;
        return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Field name="resourceName" label="Resource Name" placeholder="resource" margin="normal" component={renderTextField} type="text" />
            </div>
            <div>
                <Button margin="normal" type="submit">SUBMIT</Button>
            </div>
        </form>);
    }
}

AddResourceForm = reduxForm({
    form: 'addResourceForm'
})(AddResourceForm);

export default withStyles(styles)(AddResourceForm);