import { takeLatest, put, call } from "redux-saga/effects";
import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { setUpdateUserFailure, setUpdateUserSuccess } from "../actions";

function fetchUpdateUserAPI(params) {
  return axios.request({
    method: "put",
    url: `${BASE_URL}${API_URL.UPDATE_USER_INFO}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: params,
  });
}

export function* fetchUpdateUserActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchUpdateUserAPI, values);

    yield put(setUpdateUserSuccess(response));
  } catch (e) {
    yield put(setUpdateUserFailure(e));
  }
}

export function* fetchUpdateUserActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_UPDATE_USER_WATCHER,
    fetchUpdateUserActionEffect
  );
}
