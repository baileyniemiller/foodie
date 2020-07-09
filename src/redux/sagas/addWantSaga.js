import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// // will be fired on FETCH_WANTS
// function* fetchWant(action) {
//   try {
// 		yield axios.get("/wants", action.payload);
//     yield put({ type: "SET_WANT", payload: action.payload });
//   } catch (error) {
//     console.log("Error getting wants ", error);
//   }
// } // end GET

// will be fired on "ADD_FAVORITE" actions
function* addWant(action) {
  try {
    yield axios.post(`/wants`, action.payload);
    yield put({ type: "SET_WANT", payload: action.payload });
  } catch (error) {
    console.log("Error with adding want:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: WANT_FAILED
  }
}
// end POST

// will be fired on DELETE_WANT
function* deleteWant(action) {
  try {
    yield axios.delete(`/wants/${action.payload.user_id}/${action.payload.list_id}`, action.payload);
    // yield put({ type: "SET_FAVORITES", payload: action.payload });
  } catch (error) {
    console.log("Error with deleting want:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: FAV_FAILED
  }
}
// end DELETE

function* addWantSaga() {
  // yield takeLatest("FETCH_WANT", fetchWant);
  yield takeLatest("ADD_WANT", addWant);
  yield takeLatest("DELETE_WANT", deleteWant);
}

export default addWantSaga;
