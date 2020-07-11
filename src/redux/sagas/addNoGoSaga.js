import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


// will be fired on "ADD_NOGO" actions
function* addNoGo(action) {
  try {
    yield axios.post(`/nogo`, action.payload);
    yield put({ type: "SET_NOGO", payload: action.payload });
  } catch (error) {
    console.log("Error with adding nogo:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: NOGO_FAILED
  }
}
// end POST


// will be fired on "DELETE_NOGO"
function* deleteNoGo(action) {
  try {
    yield axios.delete(`/nogo`, {data: action.payload});
    // yield put({ type: "SET_NOGO", payload: action.payload });
  } catch (error) {
    console.log("Error with deleting nogo:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: FAV_FAILED
  }
}
// end DELETE


function* addNoGoSaga() {
  yield takeLatest("ADD_NOGO", addNoGo);
  yield takeLatest("DELETE_NOGO", deleteNoGo);
}


export default addNoGoSaga;
