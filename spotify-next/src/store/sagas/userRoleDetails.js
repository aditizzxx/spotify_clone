import { put, takeLatest, call } from 'redux-saga/effects';
import { setUserRoleDetailsSuccess, setUserRoleDetailsFailure } from '../actions';
import axios from 'src/axios/index';
import * as actionTypes from '../actionTypes';
import { API_URL, BASE_URL } from 'src/axios/config';


function fetchUserRoleDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.USER_ROLE_DETAILS}`,
    data: params,
  });
}

function* fetchUserRoleData(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchUserRoleDetailsAPI, values);

    yield put(setUserRoleDetailsSuccess(response));
  } catch (error) {
    yield put(setUserRoleDetailsFailure(error));
  }
}

export function* fetchUserRoleDetailsActionWatcher() {
  yield takeLatest(actionTypes.FETCH_USER_ROLE_DATA_ACTION, fetchUserRoleData);
}
