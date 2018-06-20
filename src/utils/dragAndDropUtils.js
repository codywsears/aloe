function keysToObj(keys, originObj) {
    return keys.reduce((acc, key) => {acc[key] = originObj[key]; return acc;}, {})
}

// Function to help reorder a list when dropped in different position
export const reorder = (list, startIndex, endIndex) => {
    let listTemp = Object.keys(list);
    const result = listTemp.slice(0);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return keysToObj(result, list);
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, srcId, destId, srcIdx, destIdx) => {
    let sourceTemp = Object.keys(source);
    let destTemp = Object.keys(destination);
    const [removed] = sourceTemp.splice(srcIdx, 1);

    destTemp.splice(destIdx, 0, removed);

    const result = {};
    result[srcId] = keysToObj(sourceTemp, source);
    result[destId] = keysToObj(destTemp, { ...destination, ...source });

    return result;
};

// CSS Helpers
export const grid = 8;