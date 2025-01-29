import { takeLatest, put, call } from "redux-saga/effects";
import { setCreatePlanDetailsSuccess, setCreatePlanDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchCreatePlanDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.CREATE_PLAN}`,
    data: params,
  });
}

export function* fetchCreatePlanDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchCreatePlanDetailsAPI, payload);
    yield put(setCreatePlanDetailsSuccess(response));
  } catch (e) {
    yield put(setCreatePlanDetailsFailure(e));
  }
}

export function* fetchCreatePlanDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_CREATE_PLAN_DETAILS_WATCHER,
    fetchCreatePlanDetailsActionEffect
  );
}
