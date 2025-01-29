import { put, takeLatest, call } from "redux-saga/effects";
import { setSearchSongDetailsSuccess, setSearchSongDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchSearchSongAPI(params) {
  // console.log(params);
  return axios.request({
    method: "get",
    url: `${BASE_URL}/search${API_URL.SEARCH_SONG}/${params}`,
    data: params,
  });
}

function* fetchSearchSongActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchSearchSongAPI, values);

    yield put(setSearchSongDetailsSuccess(response));
  } catch (error) {
    yield put(setSearchSongDetailsFailure(error));
  }
}

export function* fetchSearchSongActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_SEARCH_SONG_WATCHER,
    fetchSearchSongActionEffect
  );
}
