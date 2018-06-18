import { API_URL_BASE } from '../../../api';
import { fetchHelper } from '../index';
import { BUCKET } from '../../actions';
import axios from 'axios';

const bucketsUrl = `${API_URL_BASE}/buckets`;

// API calls
function get() {
    return axios.get(bucketsUrl);
}

// Sagas
export function *getBuckets(action) {
    yield fetchHelper(action, BUCKET, get);
}

export function *createBucket(action) {

}