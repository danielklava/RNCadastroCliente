import { combineReducers, AnyAction, Action } from 'redux'
import { all, fork } from 'redux-saga/effects'

import clientsSaga from './clients/sagas'
import { ClientsReducer } from './clients/reducer'
import { ClientsState } from './clients/types'

import UserSaga from './user/sagas';
import { UserState } from './user/types';
import { UserReducer } from './user/reducer';

import { Dispatch } from 'react'
import { NavigationState } from 'react-navigation';
import { PaymentConditionState } from './paymentConditions/types';
import { PaymentConditionsReducer } from './paymentConditions/reducer';
import PaymentConditionsSaga from './paymentConditions/sagas';

export const rootReducer = combineReducers({
    clients: ClientsReducer,
    user: UserReducer,
    paymentConditions: PaymentConditionsReducer
})

//import { offline } from '@redux-offline/redux-offline';
//import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

export interface AppState {
    clients: ClientsState
    user: UserState,
    paymentConditions: PaymentConditionState,
    nav: NavigationState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

export function* rootSaga() {
    yield all([
        fork(clientsSaga),
        fork(UserSaga),
        fork(PaymentConditionsSaga)
    ])
}