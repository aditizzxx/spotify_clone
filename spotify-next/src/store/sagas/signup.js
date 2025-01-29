import { put, takeLatest, call } from "redux-saga/effects";
import { setSignupDetailsSuccess, setSignupDetailsFailure } from "../actions";
import axios from "src/axios/index.js";
import * as actionTypes from "../actionTypes";
import { API_URL, BASE_URL } from "../../axios/config";
import { toast } from "react-toastify";

function fetchSignupDetailsAPI(params) {
  return axios.request({
    method: "post",
    url: `${BASE_URL}${API_URL.SIGNUP}`,
    data: params,
  });
}

function* fetchSignupDetailsActionEffect(action) {
  try {
    const values = action.payload;

    const response = yield call(fetchSignupDetailsAPI, values);
    if(response){
      toast.success("Welcome to spotify!");
    }
    yield put(setSignupDetailsSuccess(response));
  } catch (error) {
    yield put(setSignupDetailsFailure(error));
  }
}

export function* fetchSignupDetailsActionWatcher() {
  yield takeLatest(
    actionTypes.FETCH_SIGNUP_DETAILS_WATCHER,
    fetchSignupDetailsActionEffect
  );
}
