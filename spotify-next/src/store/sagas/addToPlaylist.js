import { takeLatest, put, call } from "redux-saga/effects";
import { setAddToPlaylistSuccess, setAddToPlaylistFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchAddToPlaylistAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.ADD_TO_PLAYLIST}`,
    data: params,
  });
}

export function* fetchAddToPlaylistActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchAddToPlaylistAPI, payload);
    yield put(setAddToPlaylistSuccess(response));
  } catch (e) {
    yield put(setAddToPlaylistFailure(e));
  }
}

export function* fetchAddToPlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_ADD_TO_PLAYLIST_WATCHER,
    fetchAddToPlaylistActionEffect
  );
}
