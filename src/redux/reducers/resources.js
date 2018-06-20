import { RESOURCE, SUCCESS, CREATE, REQUEST, FETCH  } from '../actions'
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
        // case RESOURCE[CREATE][REQUEST]: 
        //     return {
        //         [action.id]: {loading: true, error: null, resources: []},
        //         ...state
        //     };
        case RESOURCE[FETCH][SUCCESS]:
            return {
                ...state,
                ...action.payload
            };
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
        default:
            return state;
    }
}