import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "ADD_PLACE" actions
function* addWant(action) {
  try {
    // let post = {name: action.payload.name, address: action.payload.formatted_address, rating: action.payload.rating};
    // passes the restaurant from the payload to the server
    yield axios.post(`/wants`, action.payload);
    yield put({ type: "SET_WANT", payload: action.payload });
  } catch (error) {
    console.log("Error with adding want:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: WANT_FAILED
  }
}

function* addWantSaga() {
  yield takeLatest("ADD_WANT", addWant);
}

export default addWantSaga;
