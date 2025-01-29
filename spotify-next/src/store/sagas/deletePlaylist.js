import { takeLatest, put, call } from "redux-saga/effects";
import { setDeletePlaylistFailure, setDeletePlaylistSuccess } from "../actions";

import axios from "src/axios/index";
import { BASE_URL, API_URL } from "../../axios/config";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";


function fetchDeletePlaylistAPI(params) {
    return axios.request({
        method: "delete",
        url: `${BASE_URL}${API_URL.DELETE_PLAYLIST}`,
        data: params,
    });
}

export function* fetchDeletePlaylistActionEffect(action) {
    try {
        const {payload} = action;
        const response = yield call(fetchDeletePlaylistAPI, payload);
        if(response){
            toast.success("Playlist deleted");
        }
        yield put(setDeletePlaylistSuccess(response));
    } catch (e) {
        yield put(setDeletePlaylistFailure(e));
    }
}

export function* fetchDeletePlaylistActionWatcher() {
    yield takeLatest(
        actionTypes.FETCH_DELETE_PLAYLIST_WATCHER,
        fetchDeletePlaylistActionEffect
    );
}
