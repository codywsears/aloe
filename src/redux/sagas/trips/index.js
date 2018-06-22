import { API_URL_BASE } from '../../../api';
import { fetchHelper, setHelper, createHelper, deleteData } from '../index';
import { TRIP } from '../../actions';
import { put, call } from 'redux-saga/effects';

export const tripUrl = `${API_URL_BASE}/trips`;

export function *getTrip(action) {
    let payloadShape = result => ({
        [action.data.tripId]: result ? result : {}
    })
    yield fetchHelper(action, TRIP, `${tripUrl}/${action.data.tripId}`, payloadShape);
}

export function *createTrip(action) {
    let url = `${tripUrl}`;
    let toCreate = {name: action.data.tripName};
    let result = yield createHelper(action, TRIP, url, toCreate);
    action.promise.resolve(result);
}