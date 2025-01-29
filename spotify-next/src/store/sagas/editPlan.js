import { takeLatest, put, call } from "redux-saga/effects";
import { setEditPlanDetailsSuccess, setEditPlanDetailsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchEditPlanDetailsAPI(params) {
  return axios.request({
    method: "put",
    url: `${BASE_URL}${API_URL.EDIT_PLAN}`,
    data: params,
  });
}

export function* fetchEditPlanDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchEditPlanDetailsAPI, payload);
    yield put(setEditPlanDetailsSuccess(response));
  } catch (e) {
    yield put(setEditPlanDetailsFailure(e));
  }
}

export function* fetchEditPlanDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_EDIT_PLAN_DETAILS_WATCHER,
    fetchEditPlanDetailsActionEffect
  );
}
