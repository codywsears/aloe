import { takeEvery, call, put } from 'redux-saga/effects';
import { BUCKET } from '../actions';
import { getBuckets, createBucket } from './buckets';

export function *fetchHelper(action, type, fetchCall) {
    try {
        const result = yield call(fetchCall);

        yield put({type: type.FETCH.SUCCESS, payload: result.data});
    } catch (err) {
        yield put({type: type.FETCH.FAILURE})
    }
}

export default function *rootSaga() {
    yield takeEvery(BUCKET.FETCH.REQUEST, getBuckets)
    yield takeEvery(BUCKET.CREATE.REQUEST, createBucket)
}