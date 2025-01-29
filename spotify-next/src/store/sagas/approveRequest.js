import { takeLatest, put, call } from "redux-saga/effects";
import { setApproveRequestDetailsSuccess, setApproveRequestDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";


function fetchApproveRequestDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.APPROVE_REQUEST}`,
    data: params,
  });
}

export function* fetchApproveRequestDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchApproveRequestDetailsAPI, payload);
    yield put(setApproveRequestDetailsSuccess(response));
  } catch (e) {
    yield put(setApproveRequestDetailsFailure(e));
  }
}

export function* fetchApproveRequestDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_APPROVE_REQUEST_DETAILS_WATCHER,
    fetchApproveRequestDetailsActionEffect
  );
}
