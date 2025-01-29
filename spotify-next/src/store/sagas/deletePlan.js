import { takeLatest, put, call } from "redux-saga/effects";
import { setDeletePlanDetailsSuccess, setDeletePlanDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchDeletePlanDetailsAPI(params) {
  return axios.request({
    method: "delete",
    url: `${BASE_URL}${API_URL.DELETE_PLAN}`,
    data: params,
  });
}

export function* fetchDeletePlanDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchDeletePlanDetailsAPI, payload);
    yield put(setDeletePlanDetailsSuccess(response));
  } catch (e) {
    yield put(setDeletePlanDetailsFailure(e));
  }
}

export function* fetchDeletePlanDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_DELETE_PLAN_DETAILS_WATCHER,
    fetchDeletePlanDetailsActionEffect
  );
}
