import {combineReducers} from 'redux';
import {buckets} from './buckets';
import {resources} from './resources'

const rootReducer = combineReducers({
    buckets,
    resources
});

export default rootReducer;