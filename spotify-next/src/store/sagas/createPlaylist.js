import { takeLatest, put, call } from "redux-saga/effects";
import {setCreatePlaylistSuccess, setCreatePlaylistFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchCreatePlaylistAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.CREATE_PLAYLIST}`,
    data: params,
  });
}

export function* fetchCreatePlaylistActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchCreatePlaylistAPI, payload);
    if(response){
      toast.success("Playlist created!");
    }
    yield put(setCreatePlaylistSuccess(response));
  } catch (e) {
    yield put(setCreatePlaylistFailure(e));
  }
}

export function* fetchCreatePlaylistActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_CREATE_PLAYLIST_WATCHER,
    fetchCreatePlaylistActionEffect
  );
}
