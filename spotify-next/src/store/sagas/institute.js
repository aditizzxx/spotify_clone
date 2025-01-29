import { put, takeLatest, call } from "redux-saga/effects";
import { setInstituteDetailsSuccess, setInstituteDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import axiosInstance from "src/axios/axiosInstance.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchInstituteDetailsAPI(params) {
  // console.log(params);
  return axiosInstance.request({
    method: "get",
    url: `http://universities.hipolabs.com/search?country=${params}`,
    data: params,
  });
}

function* fetchInstituteDetailsActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchInstituteDetailsAPI, values);
    yield put(setInstituteDetailsSuccess(response));
  } catch (error) {
    yield put(setInstituteDetailsFailure(error));
  }
}

export function* fetchInstituteDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_INSTITUTE_DETAILS_WATCHER,
    fetchInstituteDetailsActionEffect
  );
}
