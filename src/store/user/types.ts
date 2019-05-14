// This file holds our state type, as well as any other types related to this Redux store.
export interface User extends ApiResponse {
  nome: string
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

export enum UserActionTypes {
  AUTH_REQUEST = '@@user/AUTH_REQUEST',
  AUTH_SUCCESS = '@@user/AUTH_SUCCESS',
  AUTH_ERROR = '@@user/AUTH_ERROR',
  AUTH_LOGOFF = '@@user/AUTH_LOGOFF'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UserState {
  readonly loading: boolean
  readonly data?: User
  readonly loggedIn: boolean
}
