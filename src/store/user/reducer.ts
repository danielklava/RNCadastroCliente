import { Reducer } from 'redux'
import { UserState, UserActionTypes } from './types'
import NavigationService from '../../navigator/NavigatorService'
import { AppState } from '..';

// Type-safe initialState!
export const initialState: UserState = {
    data: undefined,
    loggedIn: false,
    loading: false
}

const reducer: Reducer<UserState> = (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case UserActionTypes.AUTH_REQUEST: {
            return { ...state, loading: true }
        }
        case UserActionTypes.AUTH_SUCCESS: {
            return { ...state, loading: false, loggedIn: true, data: action.payload }
        }
        case UserActionTypes.AUTH_ERROR: {
            return { ...state, loading: false, loggedIn: false, errors: action.payload }
        }
        case UserActionTypes.AUTH_LOGOFF: {
            return { ...state, loggedIn: false }
        }
        default: {
            return state
        }
    }
}

export { reducer as UserReducer }
