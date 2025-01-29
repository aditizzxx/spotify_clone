import { takeLatest, put, call } from "redux-saga/effects";
import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { setUpdateSongFailure, setUpdateSongSuccess } from "../actions";

function fetchUpdateSongAPI(params) {
  return axios.request({
    method: "patch",
    url: `${BASE_URL}${API_URL.UPDATE_SONG}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: params,
  });
}

export function* fetchUpdateSongActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchUpdateSongAPI, values);

    yield put(setUpdateSongSuccess(response));
  } catch (e) {
    yield put(setUpdateSongFailure(e));
  }
}

export function* fetchUpdateSongActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_UPDATE_SONG_WATCHER,
    fetchUpdateSongActionEffect
  );
}
