import { takeLatest, put, call } from "redux-saga/effects";
import {setLikeSongSuccess, setLikeSongFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchLikeSongAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.LIKE_SONG}`,
    data: params,
  });
}

export function* fetchLikeSongActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchLikeSongAPI, payload);
    if(response){
      toast.success("Song added to Liked Songs");
    }
    yield put(setLikeSongSuccess(response));
  } catch (e) {
    yield put(setLikeSongFailure(e));
  }
}

export function* fetchLikeSongActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_LIKE_SONG_WATCHER,
    fetchLikeSongActionEffect
  );
}
