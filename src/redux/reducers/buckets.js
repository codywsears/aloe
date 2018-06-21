import { BUCKET, SUCCESS, CREATE, REQUEST, FETCH, DELETE } from '../actions'
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
        case BUCKET[DELETE][SUCCESS]:
            let { bucketId } = action.payload;
            delete state[bucketId];
            return {
                ...state
            }
        default:
            return state
    }
}