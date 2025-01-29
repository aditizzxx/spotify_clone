import { put, takeLatest, call } from "redux-saga/effects";
import { setUnfollowArtistDetailsFailure, setUnfollowArtistDetailsSuccess } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchUnfollowArtistDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.UNFOLLOW_ARTIST}/${params?.id}`,
    data: params,
  });
}

function* fetchUnfollowArtistDetailsActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchUnfollowArtistDetailsAPI, values);

    yield put(setUnfollowArtistDetailsSuccess(response));
  } catch (error) {
    yield put(setUnfollowArtistDetailsFailure(error));
  }
}

export function* fetchUnfollowArtistDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_UNFOLLOW_ARTIST_DETAILS_WATCHER,
    fetchUnfollowArtistDetailsActionEffect
  );
}
