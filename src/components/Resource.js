import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '../utils/dragAndDropUtils';

class Resource extends React.Component {
    render() { 
        let { name, index, id } = this.props;
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
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}>
                    {name}
                </div>
            )}
        </Draggable>
        );
    }
}
 
export default Resource;