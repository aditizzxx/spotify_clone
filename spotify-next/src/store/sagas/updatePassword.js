import { takeLatest, put, call } from "redux-saga/effects";
import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { setUpdatePasswordFailure, setUpdatePasswordSuccess } from "../actions";


function fetchUpdatePasswordAPI(params) {
    return axios.request({
        method: "put",
        url: `${BASE_URL}${API_URL.UPDATE_PASSWORD}`,
        data: params,
    });
}

export function* fetchUpdatePasswordActionEffect(action) {
    try {
        const values = action.payload;

        const response = yield call(fetchUpdatePasswordAPI , values);

        yield put(setUpdatePasswordSuccess(response));
    } catch (e) {
        yield put(setUpdatePasswordFailure(e));
    }
}

export function* fetchUpdatePasswordActionWatcher() {
    yield takeLatest(
        actionTypes.FETCH_UPDATE_PASSWORD_WATCHER,
        fetchUpdatePasswordActionEffect
    );
}
