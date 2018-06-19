export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const FETCH = 'FETCH';
export const CREATE = 'CREATE';
export const DELETE = 'DELETE';

function createRequestTypes(base) {
    return [FETCH, CREATE, DELETE].reduce((obj, requestType) => {
        obj[requestType] = [REQUEST, SUCCESS, FAILURE].reduce((acc, eventType) => {
            acc[eventType] = `${base}_${requestType}_${eventType}`;
            return acc;
        }, {});
        return obj;
    }, {});
}

//Create action name constants (i.e. BUCKET_FETCH_SUCCESS)
export const BUCKET = createRequestTypes('BUCKET');

export function getBucketsAction() {
    return {type: BUCKET[FETCH][REQUEST]};
}

export function reorderBucketAction(bucketId, sourceIdx, destIdx) {
    return {
        type: 'BUCKET_REORDER',
        data: {
            bucketId,
            sourceIdx,
            destIdx
        }
    }
}

export function moveResourceAction(sourceBucketId, destBucketId, sourceIndex, destIndex) {
    return {
        type: 'RESOURCE_MOVE',
        data: {
            sourceBucketId,
            destBucketId,
            sourceIndex,
            destIndex
        }
    }
}