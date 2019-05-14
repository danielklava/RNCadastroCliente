import { Store, createStore, applyMiddleware, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga'
// Import the state interface and our combined reducers/sagas.
import { AppState, rootReducer, rootSaga } from './src/store'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

export default function configureStore(
  initialState: AppState
): Store<AppState> {

  const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
  };

  const pReducer = persistReducer(persistConfig, rootReducer);

  // create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const store: Store<AppState> = createStore(
    pReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}
