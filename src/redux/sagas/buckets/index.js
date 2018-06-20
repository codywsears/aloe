import { API_URL_BASE } from '../../../api';
import { fetchHelper, createHelper } from '../index';
import { BUCKET, toggleAddBucketModal } from '../../actions';
import { put } from 'redux-saga/effects';

const bucketsUrl = `${API_URL_BASE}/buckets`;

// Sagas
export function *getBuckets(action) {
    yield fetchHelper(action, BUCKET, bucketsUrl + '/' + action.data.tripId);
}

export function *createBucket(action) {
    let url = `${bucketsUrl}/${action.data.tripId}`;
    let toCreate = {name: action.data.bucketName};
    yield createHelper(action, BUCKET, url, toCreate);
    // yield put(toggleAddBucketModal());
    action.promise.resolve();
}