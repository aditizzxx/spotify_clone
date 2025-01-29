import { put, takeLatest, call } from "redux-saga/effects";
import { setForgotPasswordDetailsFailure, setForgotPasswordDetailsSuccess } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchForgotPasswordDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.FORGOT_PASSWORD}`,
    data: params,
  });
}

function* fetchForgotPasswordDetailsActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchForgotPasswordDetailsAPI, values);

    yield put(setForgotPasswordDetailsSuccess(response));
  } catch (error) {
    yield put(setForgotPasswordDetailsFailure(error));
  }
}

export function* fetchForgotPasswordDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_FORGOT_PASSWORD_DETAILS_WATCHER,
    fetchForgotPasswordDetailsActionEffect
  );
}
