import { takeLatest, put, call } from "redux-saga/effects";
import { setDeleteSongFailure, setDeleteSongSuccess } from "../actions";
import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";


function fetchDeleteSongAPI(params) {
    return axios.request({
        method: "delete",
        url: `${BASE_URL}${API_URL.DELETE_SONG}`,
        data: params,
    });
}

export function* fetchDeleteSongActionEffect(action) {
    try {
        const {payload} = action;

        const response = yield call(fetchDeleteSongAPI, payload);

        yield put(setDeleteSongSuccess(response));
    } catch (e) {
        yield put(setDeleteSongFailure(e));
    }
}

export function* fetchDeleteSongActionWatcher() {
    yield takeLatest(
        actionTypes.FETCH_DELETE_SONG_WATCHER,
        fetchDeleteSongActionEffect
    );
}
