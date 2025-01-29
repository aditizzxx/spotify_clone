import { takeLatest, put, call } from "redux-saga/effects";
import { setDislikedPlaylistSuccess, setDislikedPlaylistFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchDislikedPlaylistAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.DISLIKE_PLAYLIST}`,
    data: params,
  });
}

export function* fetchDislikedPlaylistActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchDislikedPlaylistAPI, payload);
    yield put(setDislikedPlaylistSuccess(response));
  } catch (e) {
    yield put(setDislikedPlaylistFailure(e));
  }
}

export function* fetchDislikedPlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_DISLIKE_PLAYLIST_WATCHER,
    fetchDislikedPlaylistActionEffect
  );
}
