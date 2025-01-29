import { takeLatest, put, call } from "redux-saga/effects";
import { setRemoveFromPlaylistSuccess, setRemoveFromPlaylistFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchRemoveFromPlaylistAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.REMOVE_FROM_PLAYLIST}`,
    data: params,
  });
}

export function* fetchRemoveFromPlaylistActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchRemoveFromPlaylistAPI, payload);
    yield put(setRemoveFromPlaylistSuccess(response));
  } catch (e) {
    yield put(setRemoveFromPlaylistFailure(e));
  }
}

export function* fetchRemoveFromPlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_REMOVE_FROM_PLAYLIST_WATCHER,
    fetchRemoveFromPlaylistActionEffect
  );
}
