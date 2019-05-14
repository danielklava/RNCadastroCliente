import { action } from 'typesafe-actions'
import { ClientsActionTypes, Client } from './types'

export const fetchRequest = () => action(ClientsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Client[]) => action(ClientsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(ClientsActionTypes.FETCH_ERROR, message)

export const insertRequest = (
    nome: string,
    nomeFantasia: string,
    logradouro: string,
    bairro: string,
    uf: string,
    limiteCredito: string,
    condicoes: Map<string, string>
) =>
    action(ClientsActionTypes.INSERT_REQUEST, {
        nome,
        nomeFantasia,
        logradouro,
        bairro,
        uf,
        limiteCredito,
        condicoes
    })
export const insertSuccess = (data: Client) => action(ClientsActionTypes.INSERT_SUCCESS, data)
export const insertError = (message: string) => action(ClientsActionTypes.INSERT_ERROR, message)

export const updateRequest = (
    id: number,
    nome: string,
    nomeFantasia: string,
    logradouro: string,
    bairro: string,
    uf: string,
    limiteCredito: string,
    condicoes: Map<string, string>
) => action(ClientsActionTypes.UPDATE_REQUEST, {
    id,
    nome,
    nomeFantasia,
    logradouro,
    bairro,
    uf,
    limiteCredito,
    condicoes
})
export const updateSuccess = (success: boolean) => action(ClientsActionTypes.UPDATE_SUCCESS, success)
export const updateError = (message: string) => action(ClientsActionTypes.UPDATE_ERROR, message)

export const deleteRequest = (id: number) => action(ClientsActionTypes.DELETE_REQUEST, id)
export const deleteSuccess = (success: boolean) => action(ClientsActionTypes.DELETE_SUCCESS, success)
export const deleteError = (message: string) => action(ClientsActionTypes.DELETE_ERROR, message)
