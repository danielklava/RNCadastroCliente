import { Reducer } from 'redux'
import { PaymentConditionActionTypes, PaymentConditionState } from './types'

// Type-safe initialState!
export const initialState: PaymentConditionState = {
    data: [],
    errors: undefined,
    loading: false
}

const reducer: Reducer<PaymentConditionState> = (state = initialState, action) => {

    switch (action.type) {
        case PaymentConditionActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case PaymentConditionActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case PaymentConditionActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }
}

export { reducer as PaymentConditionsReducer }
