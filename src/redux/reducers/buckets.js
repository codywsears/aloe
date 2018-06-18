import { initialResource } from './resource';
import { BUCKET, SUCCESS, CREATE, REQUEST, FETCH  } from '../actions'
const initialBuckets = [];

/** 
 * Reducer to manage the buckets within a trip.
 */
export function buckets(state = initialBuckets, action) {
    switch(action.type) {
        case BUCKET[CREATE][REQUEST]: 
            return {
                [action.id]: {loading: true, error: null, resources: []},
                ...state
            };
        case BUCKET[FETCH][SUCCESS]:
            return [
                ...action.payload,
                ...state
            ];
        default:
            return state
    }
}