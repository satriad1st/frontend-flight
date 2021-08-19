/* global fetch */

import es6promise from "es6-promise";
import fetch from "isomorphic-unfetch";
import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";

import { actionTypes, failure, loadDataSuccess } from "./actions";

const config = require("../config/config.json");
es6promise.polyfill();

/* EXAMPLE: FETCH SETTINGS FROM APG */
function* loadSettingData() {
  const privateGatewayURL = config.core.private_gateway.base_url;
  try {
    const res = yield fetch(privateGatewayURL);
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}
function* rootSaga() {
 yield all([takeLatest(actionTypes.LOAD_DATA, loadSettingData)]);
}

export default rootSaga;
