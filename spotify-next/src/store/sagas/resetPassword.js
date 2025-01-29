import { put, takeLatest, call } from "redux-saga/effects";
import { setResetPasswordDetailsSuccess, setResetPasswordDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchResetPasswordDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.RESET_PASSWORD}`,
    data: params,
  });
}

function* fetchResetPasswordDetailsActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchResetPasswordDetailsAPI, values);
    yield put(setResetPasswordDetailsSuccess(response));
  } catch (error) {
    yield put(setResetPasswordDetailsFailure(error));
  }
}

export function* fetchResetPasswordDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_RESET_PASSWORD_DETAILS_WATCHER,
    fetchResetPasswordDetailsActionEffect
  );
}
