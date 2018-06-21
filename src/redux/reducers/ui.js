let initialUiState = {
    showAddBucketModal: false,
    showAddResourceModal: {},
    bucketColorPool: {
        red: false,
        pink: false,
        purple: false,
        deepPurple: false,
        indigo: false,
        blue: false,
        lightBlue: false,
        cyan: false,
        green: false,
        lightGreen: false,
        lime: false,
        yellow: false,
        amber: false,
        orange: false,
        deepOrange: false,
        brown: false,
        blueGrey: false
    }
}

/**
 * Reducer to manage the ui state of the application
 */
export function ui(state = initialUiState, action) {
    switch(action.type) {
        case 'TOGGLE_ADDBUCKET_MODAL':
            return {
                ...state,
                showAddBucketModal: !state.showAddBucketModal
            }
        case 'TOGGLE_ADDRESOURCE_MODAL':
            let { bucketId } = action.data;
            return {
                ...state,
                showAddResourceModal: {
                    ...state.showAddResourceModal,
                    [bucketId]: !state.showAddResourceModal[bucketId]
                }
            }
        case 'ADD_BUCKET_COLOR':
            let { color, colorObj } = action.data;
            return {
                ...state,
                bucketColorPool: {
                    ...state.bucketColorPool,
                    [color]: {
                        ...colorObj
                    }
                }
            }
        default:
            return state;
    }
}