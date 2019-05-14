import { action } from 'typesafe-actions'
import { UserActionTypes, User } from './types'

export const authRequest = (u: string, p: string) => action(UserActionTypes.AUTH_REQUEST, { username: u, password: p })
export const authSuccess = (data: User) => action(UserActionTypes.AUTH_SUCCESS, data)
export const authError = (message: string) => action(UserActionTypes.AUTH_ERROR, message)

export const authLogoff = () => action(UserActionTypes.AUTH_LOGOFF)