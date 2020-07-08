import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "ADD_PLACE" actions
function* addFavorite(action) {
  try {
    // passes the restaurant from the payload to the server
    yield axios.post(`/favorites`, action.payload);
    yield put({ type: "SET_FAVORITE", payload: action.payload });
  } catch (error) {
    console.log("Error with adding favorite:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: FAV_FAILED
  }
}

function* addFavoriteSaga() {
  yield takeLatest("ADD_FAVORITE", addFavorite);
}

export default addFavoriteSaga;
