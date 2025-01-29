import { put, takeLatest, call } from "redux-saga/effects";
import { setConfirmSubscriptionDetailsSuccess, setConfirmSubscriptionDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchConfirmSubscriptionDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.CONFIRM_SUBSCRIPTION}`,
    data: params,
  });
}

function* fetchConfirmSubscriptionDetailsActionEffect(action) {
  console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchConfirmSubscriptionDetailsAPI, values);
    yield put(setConfirmSubscriptionDetailsSuccess(response));
  } catch (error) {
    yield put(setConfirmSubscriptionDetailsFailure(error));
  }
}

export function* fetchConfirmSubscriptionDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_CONFIRM_SUBSCRIPTION_DETAILS_WATCHER,
    fetchConfirmSubscriptionDetailsActionEffect
  );
}
