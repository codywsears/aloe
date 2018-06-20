import { BUCKET, SUCCESS, CREATE, REQUEST, FETCH  } from '../actions'
const initialBuckets = {};

/** 
 * Reducer to manage the buckets within a trip.
 */
export function buckets(state = initialBuckets, action) {
    switch(action.type) {
        case BUCKET[CREATE][SUCCESS]: 
            return {
                ...state,
                ...action.payload
            };
        case BUCKET[FETCH][SUCCESS]:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}