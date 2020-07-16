import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// will be fired on "ADD_WANT" actions
function* addWant(action) {
  try {
    yield axios.post(`/wants`, action.payload);
    yield put({ type: "SET_WANT", payload: action.payload });
  } catch (error) {
    console.log("Error with adding want:", error);
  }
}
// end POST

// will be fired on "DELETE_WANT"
function* deleteWant(action) {
  try {
    yield axios.delete(`/wants`, { data: action.payload });
  } catch (error) {
    console.log("Error with deleting want:", error);
  }
}
// end DELETE

function* addWantSaga() {
  yield takeLatest("ADD_WANT", addWant);
  yield takeLatest("DELETE_WANT", deleteWant);
}

export default addWantSaga;
