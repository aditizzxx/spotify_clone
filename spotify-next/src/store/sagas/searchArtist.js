import { put, takeLatest, call } from "redux-saga/effects";
import { setSearchArtistDetailsSuccess, setSearchArtistDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchSearchArtistAPI(params) {
  return axios.request({
    method: "get",
    url: `${BASE_URL}/search${API_URL.SEARCH_ARTIST}/${params}`,
    data: params,
  });
}

function* fetchSearchArtistActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchSearchArtistAPI, values);

    yield put(setSearchArtistDetailsSuccess(response));
  } catch (error) {
    yield put(setSearchArtistDetailsFailure(error));
  }
}

export function* fetchSearchArtistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_SEARCH_ARTIST_WATCHER,
    fetchSearchArtistActionEffect
  );
}
