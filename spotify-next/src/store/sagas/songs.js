import { put, takeLatest, call } from "redux-saga/effects";
import { setSongDetailsSuccess, setSongDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchSongDetailsAPI(params) {
  return axios.request({
    method: "get",
    url: `${BASE_URL}/${params}`,
    data: params,
  });
}

function* fetchSongDetailsActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchSongDetailsAPI, values);

    yield put(setSongDetailsSuccess(response));
  } catch (error) {
    yield put(setSongDetailsFailure(error));
  }
}

export function* fetchSongDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_SONG_DETAILS_WATCHER,
    fetchSongDetailsActionEffect
  );
}
