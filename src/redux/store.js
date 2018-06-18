import {createLogger} from "redux-logger";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from './reducers';
import rootSaga from './sagas';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        collapsed: true,
        duration: true
    });
    middleware.push(logger);
}

// create redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export default store;
