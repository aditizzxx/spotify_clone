import { put, takeLatest, call } from "redux-saga/effects";
import { setSearchPlaylistDetailsSuccess, setSearchPlaylistDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchSearchPlaylistAPI(params) {
  return axios.request({
    method: "get",
    url: `${BASE_URL}/search${API_URL.SEARCH_PLAYLIST}/${params}`,
    data: params,
  });
}

function* fetchSearchPlaylistActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchSearchPlaylistAPI, values);

    yield put(setSearchPlaylistDetailsSuccess(response));
  } catch (error) {
    yield put(setSearchPlaylistDetailsFailure(error));
  }
}

export function* fetchSearchPlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_SEARCH_PLAYLIST_WATCHER,
    fetchSearchPlaylistActionEffect
  );
}
