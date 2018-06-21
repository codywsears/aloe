import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { resourceStyles } from '../utils/reactStyles';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './shared/materialUIRender';

class TempResource extends React.Component {
    render() { 
        let { onSubmit, handleSubmit, classes, deleteTempResource, colorObj } = this.props;
        
        return (
            <div className={classes.resource} style={{background: `${colorObj[500]}aa`}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field autoFocus name="resourceName" label="Resource Name" onBlur={deleteTempResource} 
                        placeholder="resource" margin="normal" component={renderTextField} type="text"/>
                </form>
            </div>
        );
    }
}
 
TempResource = reduxForm({
    form: 'tempResourceForm'
})(TempResource);

export default withStyles(resourceStyles)(TempResource);