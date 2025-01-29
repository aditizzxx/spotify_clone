import { put, takeLatest, call } from "redux-saga/effects";
import { setArtistDetailsFailure, setArtistDetailsSuccess } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchArtistDetailsAPI(params) {
  return axios.request({
    method: "get",
    url: `${BASE_URL}${API_URL.SEARCH_ARTIST}/${params?.id}`,
    data: params,
  });
}

function* fetchArtistDetailsActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchArtistDetailsAPI, values);

    yield put(setArtistDetailsSuccess(response));
  } catch (error) {
    yield put(setArtistDetailsFailure(error));
  }
}

export function* fetchArtistDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_ARTIST_DETAILS_WATCHER,
    fetchArtistDetailsActionEffect
  );
}
