import { put, takeLatest, call } from "redux-saga/effects";
import { setArtistRoleFailure, setArtistRoleSuccess } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";

function fetchArtistRoleAPI(params) {
  return axios.request({
    method: "patch",
    url: `${BASE_URL}${API_URL.BECOME_ARTIST}`,
    data: params,
  });
}

function* fetchArtistRoleActionEffect(action) {
  // console.log(action);
  try {
    const values = action.payload;

    const response = yield call(fetchArtistRoleAPI, values);

    yield put(setArtistRoleSuccess(response));
  } catch (error) {
    yield put(setArtistRoleFailure(error));
  }
}

export function* fetchArtistRoleActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_ARTIST_ROLE_WATCHER,
    fetchArtistRoleActionEffect
  );
}
