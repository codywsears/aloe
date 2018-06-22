import { TRIP, SUCCESS, CREATE, REQUEST, FETCH, DELETE } from '../actions'
const initialBuckets = {};

/** 
 * Reducer to manage the buckets within a trip.
 */
export function trips(state = initialBuckets, action) {
    switch(action.type) {
        case TRIP[FETCH][SUCCESS]:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}