import { put, takeLatest, call } from 'redux-saga/effects';
import { userActionSuccess, userActionFailure } from '../actions';
import axios from 'src/axios/index';
import * as actionTypes from '../actionTypes';
import { API_URL, BASE_URL } from 'src/axios/config';


function fetchUserAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.USER}`,
    data: params,
  });
}

function* fetchUserData(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchUserAPI, values);

    yield put(userActionSuccess(response));
  } catch (error) {
    yield put(userActionFailure(error));
  }
}

export function* watchUserSaga() {
  yield takeLatest(actionTypes.FETCH_USERS_DATA_ACTION, fetchUserData);
}
