import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

export const CardActionWrapper = ({colorObj, deleteBucket, 
    getResourcesToDel, createTempResource, id, tripId}) => {
        return (
            <div>
                <IconButton aria-label="Delete bucket" style={{color: colorObj[800]}} 
                    onClick={() => deleteBucket(tripId, id, getResourcesToDel())}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label="Add Resource" style={{color: colorObj[800]}} onClick={() => createTempResource(id)}>
                    <AddIcon/>
                </IconButton>
            </div>
        );
}