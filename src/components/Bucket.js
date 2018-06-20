import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { grid } from '../utils/dragAndDropUtils';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
    let listStyle = {
        padding: grid,
        width: 250,
        height: "75%"
    };
    return {
        draggingOver: {
            ...listStyle,
            background: theme.palette.secondary.dark
        },
        notDraggingOver: {
            ...listStyle
        },
        cardStyle: {
            marginTop: "16px"
        }
    };
};

class Bucket extends Component {
    render() {
        let { color, name, id, classes } = this.props;

        return (
            <Card className={classes.cardStyle}>
                <CardHeader title={name}/>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef}
                            className={snapshot.isDraggingOver ? classes.draggingOver : classes.notDraggingOver}>
                            {this.props.children}
                        </div>
                        )}
                </Droppable>
            </Card>
          );
    }
}
 
export default withStyles(styles)(Bucket);