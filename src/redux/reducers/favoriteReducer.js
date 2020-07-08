const favoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FAVORITE":
      return action.payload;
    case "SET_FAVS_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default favoriteReducer;
