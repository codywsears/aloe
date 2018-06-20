export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const FETCH = 'FETCH';
export const CREATE = 'CREATE';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';

function createRequestTypes(base) {
    return [FETCH, UPDATE, CREATE, DELETE].reduce((obj, requestType) => {
        obj[requestType] = [REQUEST, SUCCESS, FAILURE].reduce((acc, eventType) => {
            acc[eventType] = `${base}_${requestType}_${eventType}`;
            return acc;
        }, {});
        return obj;
    }, {});
}

//Create action name constants (i.e. BUCKET_FETCH_SUCCESS)
export const BUCKET = createRequestTypes('BUCKET');
export const RESOURCE = createRequestTypes('RESOURCE');

export function getBucketsAction(tripId) {
    return {type: BUCKET[FETCH][REQUEST], data: {tripId}};
}

export function createBucketAction(tripId, bucketName, resolve, reject) {
    return {type: BUCKET[CREATE][REQUEST], data: {tripId, bucketName}, promise: {resolve, reject}};
}

export function getResourcesAction(bucketId) {
    return {type: RESOURCE[FETCH][REQUEST], data: {bucketId}};
}

export function reorderBucketAction(bucketId, reorderResult) {
    return {
        type: 'BUCKET_REORDER',
        data: {
            bucketId,
            reorderResult
        }
    }
}

export function moveResourceAction(result, sourceBucketId, destBucketId) {
    return {
        type: 'RESOURCE_MOVE',
        data: {
            sourceBucketId,
            destBucketId,
            result
        }
    }
}

export function toggleAddBucketModal() {
    return {
        type: 'TOGGLE_ADDBUCKET_MODAL'
    }
}