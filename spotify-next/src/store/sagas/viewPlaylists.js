import { put, takeLatest, call } from "redux-saga/effects";
import {
  viewPlaylistsActionSuccess,
  viewPlaylistsActionFailure,
} from "../actions";
import axios from "src/axios/index";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "src/axios/config";

function fetchViewPlaylistAPI(values, params, action) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.VIEW_PLAYLIST}`,
    data: values,
  });
}

function* fetchViewPlaylistData(action) {
  // console.log(action.payload);
  try {
    const values = action.payload;
    const response = yield call(fetchViewPlaylistAPI, values);
    yield put(viewPlaylistsActionSuccess(response));
  } catch (error) {
    yield put(viewPlaylistsActionFailure(error));
  }
}

export function* watchViewPlaylistSaga() {
  yield takeLatest(
    actionTypes.FETCH_VIEW_PLAYLISTS_WATCHER,
    fetchViewPlaylistData
  );
}
