import { takeEvery, call, put, all } from 'redux-saga/effects';
import { BUCKET, RESOURCE } from '../actions';
import { getBuckets, createBucket } from './buckets';
import { getResources, resourceMove, resourceReorder } from './resources';

// API calls
function get(url) {
    return window.firebase.database().ref(url).once('value').then((snapshot) => {
        return snapshot.val()
    });
}

function set(url, toSet) {
    return window.firebase.database().ref(url).set(toSet);
}

function create(url, toPush) {
    let newPushedRef = window.firebase.database().ref(url).push();
    toPush['id'] = newPushedRef.key;
    newPushedRef.set(toPush);
    return toPush;
}

export function *setHelper(action, type, setUrl, toSet) {
    try {
        const result = yield call(set, setUrl, toSet);

        yield put({type: type.UPDATE.SUCCESS});
    } catch(err) {
        yield put({type: type.UPDATE.FAILURE});
    }
}

export function *fetchHelper(action, type, getUrl, payloadShape = (result) => result) {
    try {
        const result = yield call(get, getUrl);

        yield put({type: type.FETCH.SUCCESS, payload: payloadShape(result)});
    } catch (err) {
        yield put({type: type.FETCH.FAILURE})
    }
}

export function *createHelper(action, type, createUrl, toCreate) {
    try {
        const result = yield call(create, createUrl, toCreate);

        yield put({type: type.CREATE.SUCCESS, payload: {[result.id]: result}});
    } catch (err) {
        yield put({type: type.CREATE.FAILURE})
    }
}

export default function *rootSaga() {
    yield all([
        takeEvery(BUCKET.FETCH.REQUEST, getBuckets),
        takeEvery(BUCKET.CREATE.REQUEST, createBucket),
        takeEvery(RESOURCE.FETCH.REQUEST, getResources),
        takeEvery('RESOURCE_MOVE', resourceMove),
        takeEvery('BUCKET_REORDER', resourceReorder)
    ])
}