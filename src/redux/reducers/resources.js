import { RESOURCE, SUCCESS, CREATE, REQUEST, FETCH, BUCKET, DELETE  } from '../actions'
import { reorder, move } from '../../utils/dragAndDropUtils';
// shape of resources store
// const initialResources = {
//     "bucketId": {
//         "res-id": {id: "res-id", name: "temp-resource"}
//     }
// };
const initialResources = {};

/** 
 * Reducer to manage the resources within a bucket.
 */
export function resources(state = initialResources, action) {
    switch(action.type) {
        case RESOURCE[CREATE][SUCCESS]: 
            let resourceId = Object.keys(action.payload)[0];
            let { originalBucketId } = action.payload[resourceId];
            delete state[originalBucketId].temp;
            return {
                ...state,
                [originalBucketId]: { 
                    ...state[originalBucketId],
                    ...action.payload
                 }
            };
        case RESOURCE[FETCH][SUCCESS]:
            return {
                ...state,
                ...action.payload
            };
        case RESOURCE[DELETE][SUCCESS]:
            let resId = action.payload.resourceId;
            let idBucket = action.payload.bucketId;
            delete state[idBucket][resId];
            return {
                ...state
            }
        case BUCKET[DELETE][SUCCESS]:
            let delId = action.payload.bucketId;
            delete state[delId];
            return {
                ...state
            }
        case 'BUCKET_REORDER':
            let { bucketId, reorderResult} = action.data;
            return {
                ...state,
                [bucketId]: { ...reorderResult }
            }
        case 'RESOURCE_MOVE':
            let { sourceBucketId, destBucketId, result } = action.data;
            return {
                ...state,
                [sourceBucketId]: { ...result[sourceBucketId] },
                [destBucketId]: { ...result[destBucketId] }
            }
        case 'CREATE_TEMP_RESOURCE':
            let buckId = action.data.bucketId;
            return {
                ...state,
                [buckId]: {
                    ...state[buckId],
                    temp: {id: 'temp', name: ''}
                }
            }
        case 'DELETE_TEMP_RESOURCE':
            let tempBuckId = action.data.bucketId;
            delete state[tempBuckId].temp;
            return {
                ...state
            }
        default:
            return state;
    }
}