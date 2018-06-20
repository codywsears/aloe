let initialUiState = {
    showAddBucketModal: false
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
        default:
            return state;
    }
}