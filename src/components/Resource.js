import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import { resourceStyles } from '../utils/reactStyles';
import Typography from '@material-ui/core/Typography';

class Resource extends React.Component {
    getBackgroundStyle = (isDragging) => {
        let { colorObj } = this.props;

        let color = isDragging ? colorObj[900] : colorObj[500];

        return {
            background: `${color}aa`
        }
    }

    render() { 
        let { name, index, id, classes } = this.props;
        return (
        <Draggable 
            key={id}
            draggableId={id}
            index={index}>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={classes.resource}
                    style={{
                        ...this.getBackgroundStyle(snapshot.isDragging),
                        ...provided.draggableProps.style
                    }}>
                    <Typography variant="body2">{name}</Typography>
                </div>
            )}
        </Draggable>
        );
    }
}
 
export default withStyles(resourceStyles)(Resource);