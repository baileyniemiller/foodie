import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// will be fired on ADD_FAVORITE
function* addFavorite(action) {
  try {
    yield axios.post(`/favorites`, action.payload);
    yield put({ type: "SET_FAVORITES", payload: action.payload });
  } catch (error) {
    console.log("Error with adding favorite:", error);
  }
}
// end POST

// will be fired on DELETE_FAVORITE
function* deleteFavorite(action) {
  try {
    yield axios.delete(`/favorites`, { data: action.payload });
  } catch (error) {
    console.log("Error with deleting favorite:", error);
  }
}
// end DELETE

function* addFavoriteSaga() {
  yield takeLatest("ADD_FAVORITE", addFavorite);
  yield takeLatest("DELETE_FAVORITE", deleteFavorite);
}

export default addFavoriteSaga;
