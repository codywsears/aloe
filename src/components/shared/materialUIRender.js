import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select'

export const renderTextField = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
<TextField 
    label={label}
    placeholder={placeholder}
    error={touched && error}
    {...input}
    {...custom}/>
)
  
export const renderCheckbox = ({ input, label }) => (
<Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
<Select
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}/>
)