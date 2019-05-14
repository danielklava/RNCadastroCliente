import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { PaymentConditionActionTypes } from './types'
import { paymentConditionFetchError, paymentConditionFetchSuccess, paymentConditionFetchRequest } from './actions'
import axios from 'axios'
import { deviceStorage } from '../../utils/DeviceStorage';

const API_ENDPOINT = 'http://10.119.48.68:8080'

function* handleFetch() {
    try {
        const res = yield call(callApi, 'get', API_ENDPOINT, '/condicoespagamento')
        if (res.error) {
            yield put(paymentConditionFetchError(res.error))
        } else {
            yield put(paymentConditionFetchSuccess(res))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(paymentConditionFetchError(err.stack!))
        } else {
            yield put(paymentConditionFetchError('An unknown error occured.'))
        }
    }
}

function* watchFetchRequest() {
    yield takeEvery(PaymentConditionActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* PaymentConditionsSaga() {
    yield all([
        fork(watchFetchRequest)
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

export default PaymentConditionsSaga
