import { put, takeLatest, call } from 'redux-saga/effects';
import { loginActionSuccess, loginActionFailure } from '../actions';
import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { API_URL, BASE_URL } from 'src/axios/config';
import { toast } from 'react-toastify';


function fetchLoginDetailsAPI(params, payload) {
  // console.log(params)

  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.LOGIN}`,
    data: params
  });
}


function* fetchLoginData(action) {
  try {
    // const {values} = action.payload;
    const { payload } = action;
    const response = yield call(fetchLoginDetailsAPI, payload);
    if(response){
      toast.success("Logged in successfully");
    }
    yield put(loginActionSuccess(response));
  } catch (error) {
    yield put(loginActionFailure(error));
  }
}

export function* watchLoginDetailsSaga() {
  yield takeLatest(
    actionTypes.FETCH_LOGIN_DETAILS_ACTION,
    fetchLoginData
  );
}
