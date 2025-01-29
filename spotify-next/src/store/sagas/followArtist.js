import { put, takeLatest, call } from "redux-saga/effects";
import { setFollowArtistDetailsFailure, setFollowArtistDetailsSuccess } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchFollowArtistDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.FOLLOW_ARTIST}/${params?.id}`,
    data: params,
  });
}

function* fetchFollowArtistDetailsActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchFollowArtistDetailsAPI, values);

    yield put(setFollowArtistDetailsSuccess(response));
  } catch (error) {
    yield put(setFollowArtistDetailsFailure(error));
  }
}

export function* fetchFollowArtistDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_FOLLOW_ARTIST_DETAILS_WATCHER,
    fetchFollowArtistDetailsActionEffect
  );
}
