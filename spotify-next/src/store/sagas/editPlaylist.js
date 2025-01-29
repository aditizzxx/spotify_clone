import { takeLatest, put, call } from "redux-saga/effects";
import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { setEditPlaylistFailure, setEditPlaylistSuccess } from "../actions";

function fetchUpdatePlaylistAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.UPDATE_PLAYLIST}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: params,
  });
}

export function* fetchUpdatePlaylistActionEffect(action) {
    // console.log(action.payload);
  try {
    const response = yield call(fetchUpdatePlaylistAPI, action.payload);

    yield put(setEditPlaylistSuccess(response));
  } catch (e) {
    // console.log(e);
    yield put(setEditPlaylistFailure(e));
  }
}

export function* fetchUpdatePlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_EDIT_PLAYLIST_WATCHER,
    fetchUpdatePlaylistActionEffect
  );
}
