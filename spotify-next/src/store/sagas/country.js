import { put, takeLatest, call } from "redux-saga/effects";
import { setCountryDetailsSuccess, setCountryDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import axiosInstance from "src/axios/axiosInstance.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchCountryDetailsAPI(params) {
  return axiosInstance.request({
    method: "get",
    url: `http://universities.hipolabs.com/search`,
    data: params,
  });
}

function* fetchCountryDetailsActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchCountryDetailsAPI, values);
    yield put(setCountryDetailsSuccess(response));
  } catch (error) {
    yield put(setCountryDetailsFailure(error));
  }
}

export function* fetchCountryDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_COUNTRY_DETAILS_WATCHER,
    fetchCountryDetailsActionEffect
  );
}
