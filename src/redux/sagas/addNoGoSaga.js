import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// // will be fired on FETCH_NOGO
// function* fetchNoGo(action) {
//   try {
// 		yield axios.get("/nogo", action.payload);
//     yield put({ type: "SET_NOGO", payload: action.payload });
//   } catch (error) {
//     console.log("Error getting nogos ", error);
//   }
// } // end GET

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

// will be fired on DELETE_NOGO
function* deleteNoGo(action) {
  try {
    yield axios.delete(`/nogo/${action.payload.user_id}/${action.payload.list_id}`, action.payload);
    // yield put({ type: "SET_NOGO", payload: action.payload });
  } catch (error) {
    console.log("Error with deleting nogo:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: FAV_FAILED
  }
}
// end DELETE

function* addNoGoSaga() {
  // yield takeLatest("FETCH_NOGO", fetchNoGo);
  yield takeLatest("ADD_NOGO", addNoGo);
  yield takeLatest("DELETE_NOGO", deleteNoGo);
}

export default addNoGoSaga;
