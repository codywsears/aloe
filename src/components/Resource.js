import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import { grid } from '../utils/dragAndDropUtils';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
    let itemStyle = {
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        borderRadius: "10px",
        margin: `0 0 ${grid}px 0`
    }

    return {
        isDragging: {
            ...itemStyle,
            background: theme.palette.secondary.light
        },
        notDragging: {
            ...itemStyle,
            background: theme.palette.secondary.main
        }
    }
}

class Resource extends React.Component {
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
                    className={snapshot.isDragging ? classes.isDragging : classes.notDragging}
                    style={{
                        ...provided.draggableProps.style
                    }}>
                    <Typography variant="body2">{name}</Typography>
                </div>
            )}
        </Draggable>
        );
    }
}
 
export default withStyles(styles)(Resource);