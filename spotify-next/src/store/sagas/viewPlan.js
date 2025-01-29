import { takeLatest, put, call } from "redux-saga/effects";
import { setViewPlanDetailsSuccess, setViewPlanDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchViewPlanDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.VIEW_PLAN}`,
    data: params,
  });
}

export function* fetchViewPlanDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchViewPlanDetailsAPI, payload);
    yield put(setViewPlanDetailsSuccess(response));
  } catch (e) {
    yield put(setViewPlanDetailsFailure(e));
  }
}

export function* fetchViewPlanDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_VIEW_PLAN_DETAILS_WATCHER,
    fetchViewPlanDetailsActionEffect
  );
}
