import { put, takeLatest, call } from "redux-saga/effects";
import { setPlaylistDetailsSuccess, setPlaylistDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchPlaylistDetailsAPI(params) {
  return axios.request({
    method: "get",
    url: `${BASE_URL}${API_URL.GET_PLAYLIST}/${params?.id}`,
    data: params,
  });
}

function* fetchPlaylistDetailsActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchPlaylistDetailsAPI, values);

    yield put(setPlaylistDetailsSuccess(response));
  } catch (error) {
    yield put(setPlaylistDetailsFailure(error));
  }
}

export function* fetchPlaylistDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_PLAYLIST_DETAILS_WATCHER,
    fetchPlaylistDetailsActionEffect
  );
}
