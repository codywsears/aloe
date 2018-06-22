import {combineReducers} from 'redux';
import {buckets} from './buckets';
import {resources} from './resources'
import {reducer} from 'redux-form';
import {trips} from './trips';
import {ui} from './ui';

const rootReducer = combineReducers({
    buckets,
    resources,
    ui,
    trips,
    form: reducer
});

export default rootReducer;