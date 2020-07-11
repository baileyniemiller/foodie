import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// // will be fired on FETCH_FAVORITES
// function* fetchFavorites(action) {
//   try {
// 		yield axios.get(`/favorites`, action.payload ); // took out action.payload for now....not sure if it'll work
//     yield put({ type: "SET_FAVORITES", payload: action.payload });
//   } catch (error) {
//     console.log("Error getting favorites ", error);
//   }
// } // end GET


// will be fired on ADD_FAVORITE
function* addFavorite(action) {
  try {
    yield axios.post(`/favorites`, action.payload);
    yield put({ type: "SET_FAVORITES", payload: action.payload });
  } catch (error) {
    console.log("Error with adding favorite:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: FAV_FAILED
  }
}
// end POST


// will be fired on DELETE_FAVORITE
function* deleteFavorite(action) {
  try {
    yield axios.delete(`/favorites`, action.payload);
    console.log('I think this is deleting?')
    // yield put({ type: "SET_FAVORITES", payload: action.payload });
  } catch (error) {
    console.log("Error with deleting favorite:", error);
    // yield put({ type: "REGISTRATION_FAILED" }); TO DO: FAV_FAILED
  }
}
// end DELETE


function* addFavoriteSaga() {
  // yield takeLatest("FETCH_FAVORITES", fetchFavorites);
  yield takeLatest("ADD_FAVORITE", addFavorite);
  yield takeLatest("DELETE_FAVORITE", deleteFavorite);
}

export default addFavoriteSaga;
