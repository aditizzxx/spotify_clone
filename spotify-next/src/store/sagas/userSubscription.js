import { put, takeLatest, call } from "redux-saga/effects";
import { setUserSubscriptionDetailsSuccess, setUserSubscriptionDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchUserSubscriptionDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.USER_SUBSCRIPTION}`,
    data: params,
  });
}

function* fetchUserSubscriptionDetailsActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchUserSubscriptionDetailsAPI, values);
    yield put(setUserSubscriptionDetailsSuccess(response));
  } catch (error) {
    yield put(setUserSubscriptionDetailsFailure(error));
  }
}

export function* fetchUserSubscriptionDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_USER_SUBSCRIPTION_DETAILS_WATCHER,
    fetchUserSubscriptionDetailsActionEffect
  );
}
