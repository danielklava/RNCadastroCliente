import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { UserActionTypes } from './types'
import { authError, authSuccess } from './actions'
import axios from 'axios'
import { deviceStorage } from '../../utils/DeviceStorage';
import NavigationService from '../../navigator/NavigatorService';
import { insertSuccess } from '../clients/actions';

const API_ENDPOINT = 'http://10.119.48.68:8080'

function* handleLogoff() {
    deviceStorage.removeItem("id_token");
    NavigationService.navigate("login", "");
}

function* handleAuthSuccess() {
    NavigationService.navigate("clientList", "");
}

function* handleAuth(action: any) {
    try {

        const { username, password } = action.payload;

        const res = yield call(callApi, 'post', API_ENDPOINT, '/login', username, password)
        console.log(res);
        if (res.err) {
            yield put(authError(res.error))
        } else {
            deviceStorage.saveItem("id_token", res.token)
            console.log(res.token);
            yield put(authSuccess(res))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(authError(err.stack!))
        } else {
            yield put(authError('An unknown error occured.'))
        }
    }
}

function* watchAuthSuccess() {
    yield takeEvery(UserActionTypes.AUTH_SUCCESS, handleAuthSuccess)
}

function* watchFetchRequest() {
    yield takeEvery(UserActionTypes.AUTH_REQUEST, handleAuth)
}

function* watchLogoffRequest() {
    yield takeEvery(UserActionTypes.AUTH_LOGOFF, handleLogoff);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* UserSaga() {
    yield all([
        fork(watchFetchRequest),
        fork(watchLogoffRequest),
        fork(watchAuthSuccess)
    ])
}

async function callApi(method: string, url: string, path: string, username: string, password: string) {

    const res = await axios.request({
        url: url + '/api/v1' + path,
        method,
        headers: {
            Accept: 'application/json'
        },
        data: {
            username: username,
            password: password
        }
    })
    return await res.data
}

export default UserSaga
