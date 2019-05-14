import { action } from 'typesafe-actions'
import { PaymentConditionActionTypes, CondicaoPagamento } from './types'

export const paymentConditionFetchRequest = () => action(PaymentConditionActionTypes.FETCH_REQUEST)
export const paymentConditionFetchSuccess = (data: CondicaoPagamento[]) => action(PaymentConditionActionTypes.FETCH_SUCCESS, data)
export const paymentConditionFetchError = (message: string) => action(PaymentConditionActionTypes.FETCH_ERROR, message)
