import { takeLatest, put, call } from "redux-saga/effects";
import { setViewArtistDetailsSuccess, setViewArtistDetailsFailure } from "../actions";
import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";


function fetchViewArtistDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.VIEW_ARTIST}`,
    data: params,
  });
}

export function* fetchViewArtistDetailsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchViewArtistDetailsAPI, payload);
    yield put(setViewArtistDetailsSuccess(response));
  } catch (e) {
    yield put(setViewArtistDetailsFailure(e));
  }
}

export function* fetchViewArtistDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_VIEW_ARTIST_DETAILS_WATCHER,
    fetchViewArtistDetailsActionEffect
  );
}
