import { API_URL_BASE } from '../../../api';
import { fetchHelper, setHelper } from '../index';
import { RESOURCE } from '../../actions';

const resourcesUrl = `${API_URL_BASE}/resources`;

// Sagas
export function *getResources(action) {
    const payloadShape = (result) => ({
        [action.data.bucketId]: result ? result : {}
    })
    yield fetchHelper(action, RESOURCE, resourcesUrl + '/' + action.data.bucketId, payloadShape);
}

export function *createResource(action) {

}

export function *resourceMove(action) {
    let { sourceBucketId, destBucketId, result } = action.data;

    let sourceUrl = `${resourcesUrl}/${sourceBucketId}`;
    let destUrl = `${resourcesUrl}/${destBucketId}`;
    yield setHelper(action, RESOURCE, sourceUrl, result[sourceBucketId]);
    yield setHelper(action, RESOURCE, destUrl, result[destBucketId]);
}

export function *resourceReorder(action) {
    let { bucketId, reorderResult } = action.data;
    let url = `${resourcesUrl}/${bucketId}`;
    yield setHelper(action, RESOURCE, url, reorderResult);
}