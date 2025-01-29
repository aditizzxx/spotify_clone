import { put, takeLatest, call } from 'redux-saga/effects';
import { setUserDetailsSuccess, setUserDetailsFailure } from '../actions';
import axios from 'src/axios/index';
import * as actionTypes from '../actionTypes';
import { API_URL, BASE_URL } from 'src/axios/config';


function fetchUserDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.USER_DETAILS}`,
    data: params,
  });
}

function* fetchUserData(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchUserDetailsAPI, values);

    yield put(setUserDetailsSuccess(response));
  } catch (error) {
    yield put(setUserDetailsFailure(error));
  }
}

export function* fetchUserDetailsActionWatcher() {
  yield takeLatest(actionTypes.FETCH_USERS_DETAILS_ACTION, fetchUserData);
}
