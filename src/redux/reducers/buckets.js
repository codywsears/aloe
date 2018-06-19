import { initialResource } from './resource';
import { BUCKET, SUCCESS, CREATE, REQUEST, FETCH  } from '../actions'
import { reorder, move } from '../../utils/dragAndDropUtils';
const initialBuckets = {};

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
            return {
                ...state,
                ...action.payload
            };
        case 'BUCKET_REORDER':
            let { bucketId, sourceIdx, destIdx } = action.data;
            let reorderedBucket = reorder(state[bucketId].resources, sourceIdx, destIdx);
            return {
                ...state,
                [bucketId]: { ...state[bucketId], resources: reorderedBucket }
            }
        case 'RESOURCE_MOVE':
            let { sourceBucketId, destBucketId, sourceIndex, destIndex } = action.data;
            let source = state[sourceBucketId].resources;
            let destination = state[destBucketId].resources;
            let result = move(source, destination, sourceBucketId, destBucketId, sourceIndex, destIndex);
            return {
                ...state,
                [sourceBucketId]: { ...state[sourceBucketId], resources: result[sourceBucketId]},
                [destBucketId]: { ...state[destBucketId], resources: result[destBucketId]}
            }
        default:
            return state
    }
}