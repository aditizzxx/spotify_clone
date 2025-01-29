import { takeLatest, put, call } from "redux-saga/effects";
import { setDisApproveRequestDetailsSuccess, setDisApproveRequestDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";


function fetchDisApproveRequestDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.DISAPPROVE_REQUEST}`,
    data: params,
  });
}

export function* fetchDisApproveRequestDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchDisApproveRequestDetailsAPI, payload);
    yield put(setDisApproveRequestDetailsSuccess(response));
  } catch (e) {
    yield put(setDisApproveRequestDetailsFailure(e));
  }
}

export function* fetchDisApproveRequestDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_DISAPPROVE_REQUEST_DETAILS_WATCHER,
    fetchDisApproveRequestDetailsActionEffect
  );
}
