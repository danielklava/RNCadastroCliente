// This file holds our state type, as well as any other types related to this Redux store.
export interface CondicaoPagamento extends ApiResponse {
  id: number
  codigo: string
  descricao: string
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

export enum PaymentConditionActionTypes {
  FETCH_REQUEST = '@@paymentConditions/FETCH_REQUEST',
  FETCH_SUCCESS = '@@paymentConditions/FETCH_SUCCESS',
  FETCH_ERROR = '@@paymentConditions/FETCH_ERROR'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface PaymentConditionState {
  readonly loading: boolean
  readonly data: CondicaoPagamento[]
  readonly errors?: string
}
