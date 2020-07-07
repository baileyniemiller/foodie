import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "ADD_PLACE" actions
function* addNoGo(action) {
  try {
    // passes the restaurant from the payload to the server
    yield axios.post(`/nogo`, action.payload);
    yield put({ type: "SET_NOGO", payload: action.payload });
  } catch (error) {
    console.log("Error with adding nogo:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: NOGO_FAILED
  }
}

function* addNoGoSaga() {
  yield takeLatest("ADD_NOGO", addNoGo);
}

export default addNoGoSaga;
