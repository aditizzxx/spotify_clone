import { takeLatest, put, call } from "redux-saga/effects";
import { setPlanDetailsSuccess, setPlanDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchPlanDetailsAPI(params) {
  return axios.request({
    method: "get",
    url: `${BASE_URL}${API_URL.GET_PLAN}/${params.id}`,
    data: params,
  });
}

export function* fetchPlanDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchPlanDetailsAPI, payload);
    yield put(setPlanDetailsSuccess(response));
  } catch (e) {
    yield put(setPlanDetailsFailure(e));
  }
}

export function* fetchPlanDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_PLAN_DETAILS_WATCHER,
    fetchPlanDetailsActionEffect
  );
}
