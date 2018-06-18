import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { getListStyle } from '../utils/dragAndDropUtils';

class Bucket extends Component {
    render() {
        let { color, name } = this.props;
        
        let css = `bucket__name--container bucket__backgroundcolor--${color}`;

        return (
            <Droppable droppableId={name}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        <div className="bucket__name">{name}</div>
                        {this.props.children}
                    </div>
                    )}
            </Droppable>
          );
    }
}
 
export default Bucket;