import { takeLatest, put, call } from "redux-saga/effects";
import { setViewSongsSuccess, setViewSongsFailure } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";


function fetchViewSongsAPI(params) {
  const { sort, limit } = params;
  let url = `${BASE_URL}${API_URL.VIEW_SONGS}`;

  // Construct URL with query parameters
  const queryParams = new URLSearchParams();
  if (sort) {
    queryParams.append('sort', sort);
  }
  if (limit) {
    queryParams.append('limit', limit);
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  return axios.request({
    method: "post",
    url,
    // url: `${BASE_URL}${API_URL.VIEW_SONGS}`,
    data: params,
  });
}

export function* fetchViewSongsActionEffect(action) {
  try {
    const { payload } = action;
    const response = yield call(fetchViewSongsAPI, payload);
    yield put(setViewSongsSuccess(response));
  } catch (e) {
    yield put(setViewSongsFailure(e));
  }
}

export function* fetchViewSongsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_VIEW_SONGS_WATCHER,
    fetchViewSongsActionEffect
  );
}
