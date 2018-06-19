// Function to help reorder a list when dropped in different position
export const reorder = (list, startIndex, endIndex) => {
    const result = list.slice(0);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, srcId, destId, srcIdx, destIdx) => {
    const sourceClone = source.slice(0);
    const destClone = destination.slice(0);
    const [removed] = sourceClone.splice(srcIdx, 1);

    destClone.splice(destIdx, 0, removed);

    const result = {};
    result[srcId] = sourceClone;
    result[destId] = destClone;

    return result;
};

// CSS Helpers
const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});