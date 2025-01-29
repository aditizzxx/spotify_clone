import { takeLatest, put, call } from "redux-saga/effects";
import { setLikedPlaylistSuccess, setLikedPlaylistFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchLikedPlaylistAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.LIKE_PLAYLIST}`,
    data: params,
  });
}

export function* fetchLikedPlaylistActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchLikedPlaylistAPI, payload);
    yield put(setLikedPlaylistSuccess(response));
  } catch (e) {
    yield put(setLikedPlaylistFailure(e));
  }
}

export function* fetchLikedPlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_LIKE_PLAYLIST_WATCHER,
    fetchLikedPlaylistActionEffect
  );
}
