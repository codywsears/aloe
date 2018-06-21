import { API_URL_BASE } from '../../../api';
import { fetchHelper, setHelper, createHelper } from '../index';
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
    let bucketId = action.data.bucketId;
    let url = `${resourcesUrl}/${bucketId}`;
    let toCreate = {name: action.data.resourceName, originalBucketId: bucketId};
    yield createHelper(action, RESOURCE, url, toCreate);
    action.promise.resolve();
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