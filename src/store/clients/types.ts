import { CondicaoPagamento } from "../paymentConditions/types";

// This file holds our state type, as well as any other types related to this Redux store.
export interface Client extends ApiResponse {
  id: number
  nome: string
  nomeFantasia: string
  logradouro: string
  bairro: string
  limiteCredito: number,
  uf: string,
  condicoes: CondicaoPagamento[]
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

export enum ClientsActionTypes {
  FETCH_REQUEST = '@@clients/FETCH_REQUEST',
  FETCH_SUCCESS = '@@clients/FETCH_SUCCESS',
  FETCH_ERROR = '@@clients/FETCH_ERROR',
  INSERT_REQUEST = '@@clients/INSERT_REQUEST',
  INSERT_SUCCESS = '@@clients/INSERT_SUCCESS',
  INSERT_ERROR = '@@clients/INSERT_ERROR',
  UPDATE_REQUEST = '@@clients/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@@clients/UPDATE_SUCCESS',
  UPDATE_ERROR = '@@clients/UPDATE_ERROR',
  DELETE_REQUEST = '@@clients/DELETE_REQUEST',
  DELETE_SUCCESS = '@@clients/DELETE_SUCCESS',
  DELETE_ERROR = '@@clients/DELETE_ERROR'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ClientsState {
  readonly loading: boolean
  readonly data: Client[]
  readonly errors?: string
}
