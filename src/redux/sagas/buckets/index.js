import { API_URL_BASE } from '../../../api';
import { fetchHelper, createHelper, deleteData } from '../index';
import { BUCKET, toggleAddBucketModal, RESOURCE } from '../../actions';
import { put, call } from 'redux-saga/effects';
import { resourcesUrl } from '../resources';

const bucketsUrl = `${API_URL_BASE}/buckets`;

// Sagas
export function *getBuckets(action) {
    yield fetchHelper(action, BUCKET, bucketsUrl + '/' + action.data.tripId);
}

export function *createBucket(action) {
    let url = `${bucketsUrl}/${action.data.tripId}`;
    let toCreate = {name: action.data.bucketName, color: action.data.color, freeBucket: action.data.freeBucket};
    yield createHelper(action, BUCKET, url, toCreate);
    action.promise.resolve();
}

export function *deleteBucket(action) {
    let { tripId, bucketId, extraResourcesToDelete } = action.data;
    let url;
    try {
        //delete bucket
        url = `${bucketsUrl}/${tripId}/${bucketId}`;
        yield call(deleteData, url);

        //delete bucket in resources
        url = `${resourcesUrl}/${bucketId}`;
        yield call(deleteData, url);

        //TODO: delete all resources tied to that bucket
        if (extraResourcesToDelete) {
            for (let toDelete of extraResourcesToDelete) {
                url = `${resourcesUrl}/${toDelete.bucketKey}/${toDelete.resource.id}`;
                try {
                    yield call(deleteData, url);
                    yield put({type: RESOURCE.DELETE.SUCCESS, payload: {bucketId: toDelete.bucketKey, resourceId: toDelete.resource.id}});
                } catch(err) {
                    put({type: RESOURCE.DELETE.FAILURE, data: err});
                }
            }
        }

        yield put({type: BUCKET.DELETE.SUCCESS, payload: {tripId, bucketId}});
    } catch(err) {
        yield put({type: BUCKET.DELETE.FAILURE, data: err});
    }
}