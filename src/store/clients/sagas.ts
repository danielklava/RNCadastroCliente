import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ClientsActionTypes } from './types'
import { fetchError, fetchSuccess, insertError, insertSuccess, fetchRequest, deleteError, deleteSuccess, updateSuccess, updateError } from './actions'
import axios from 'axios'
import { deviceStorage } from '../../utils/DeviceStorage';

const API_ENDPOINT = 'http://10.119.48.68:8080'

function* handleUpdate(action: any) {
    try {
        console.log(action.payload)

        const res = yield call(callApi, 'put', API_ENDPOINT, '/clientes/' + action.payload.id, action.payload)
        if (res.error) {
            yield put(updateError(res.error))
        } else {
            yield put(updateSuccess(res))
            yield put(fetchRequest())
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(updateError(err.stack!))
        } else {
            yield put(updateError('An unknown error occured.'))
        }
    }
}

function* handleDelete(action: any) {
    try {
        console.log(action.payload)

        const res = yield call(callApi, 'delete', API_ENDPOINT, '/clientes/' + action.payload)
        if (res.error) {
            yield put(deleteError(res.error))
        } else {
            yield put(deleteSuccess(res))
            yield put(fetchRequest())
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(deleteError(err.stack!))
        } else {
            yield put(deleteError('An unknown error occured.'))
        }
    }
}

function* handleInsert(action: any) {
    try {
        console.log(action.payload)

        const res = yield call(callApi, 'post', API_ENDPOINT, '/clientes', action.payload)
        if (res.error) {
            yield put(insertError(res.error))
        } else {
            yield put(insertSuccess(res))
            yield put(fetchRequest())
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(insertError(err.stack!))
        } else {
            yield put(insertError('An unknown error occured.'))
        }
    }
}

function* handleFetch() {
    try {
        const res = yield call(callApi, 'get', API_ENDPOINT, '/clientes')
        if (res.error) {
            yield put(fetchError(res.error))
        } else {
            yield put(fetchSuccess(res))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchError(err.stack!))
        } else {
            yield put(fetchError('An unknown error occured.'))
        }
    }
}

function* watchUpdateRequest() {
    yield takeEvery(ClientsActionTypes.UPDATE_REQUEST, handleUpdate)
}

function* watchInsertRequest() {
    yield takeEvery(ClientsActionTypes.INSERT_REQUEST, handleInsert)
}

function* watchDeleteRequest() {
    yield takeEvery(ClientsActionTypes.DELETE_REQUEST, handleDelete)
}

function* watchFetchRequest() {
    yield takeEvery(ClientsActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* ClientsSaga() {
    yield all([
        fork(watchFetchRequest),
        fork(watchInsertRequest),
        fork(watchDeleteRequest),
        fork(watchUpdateRequest)
    ])
}

async function callApi(method: string, url: string, path: string, data?: any) {
    const token = await deviceStorage.getItem('id_token');
    console.log(token);
    console.log(url + '/api/v1' + path + " : " + token)
    const res = await axios.request({
        url: url + '/api/v1' + path,
        method,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        },
        data: data
    })
    return await res.data
}

export default ClientsSaga
