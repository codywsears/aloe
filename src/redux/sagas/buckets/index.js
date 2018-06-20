import { API_URL_BASE } from '../../../api';
import { fetchHelper } from '../index';
import { BUCKET } from '../../actions';

const bucketsUrl = `${API_URL_BASE}/buckets`;

// Sagas
export function *getBuckets(action) {
    yield fetchHelper(action, BUCKET, bucketsUrl + '/' + action.data.tripId);
}

export function *createBucket(action) {

}