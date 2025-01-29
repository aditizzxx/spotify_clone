import { takeLatest, put, call } from "redux-saga/effects";
import { setDislikeSongSuccess, setDislikeSongFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchDislikeSongAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.DISLIKE_SONG}`,
    data: params,
  });
}

export function* fetchDislikeSongActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchDislikeSongAPI, payload);
    if(response){
      toast.success("Song removed from Liked Songs");
    }
    yield put(setDislikeSongSuccess(response));
  } catch (e) {
    yield put(setDislikeSongFailure(e));
  }
}

export function* fetchDislikeSongActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_DISLIKE_SONG_WATCHER,
    fetchDislikeSongActionEffect
  );
}
