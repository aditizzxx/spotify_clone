import { takeLatest, put, call } from "redux-saga/effects";
import { setCreateSongSuccess, setCreateSongFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";


function fetchCreateSongAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.CREATE_SONG}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: params,
  });
}

export function* fetchCreateSongActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchCreateSongAPI, payload);
    yield put(setCreateSongSuccess(response));
  } catch (e) {
    yield put(setCreateSongFailure(e));
  }
}

export function* fetchCreateSongActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_CREATE_SONG_WATCHER,
    fetchCreateSongActionEffect
  );
}
